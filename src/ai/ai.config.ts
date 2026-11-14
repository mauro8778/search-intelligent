import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { aiEnvConfig } from './config/ai.env.config';
import {
  AiGenerateOptions,
  AiProviderType,
  IAiClient,
  IAiClientProvider,
} from './ports/ai-client.port';

export type {
  AiGenerateOptions,
  AiModelProfile,
  AiProviderType,
  IAiClient,
} from './ports/ai-client.port';

interface GeminiGenerateContentBody {
  contents: Array<{
    role?: 'user' | 'model';
    parts: Array<{ text: string }>;
  }>;
  systemInstruction?: {
    parts: Array<{ text: string }>;
  };
  generationConfig?: {
    responseMimeType?: string;
    temperature?: number;
  };
}

interface GeminiGenerateContentResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
}

@Injectable()
export class AiConfig implements OnModuleInit, IAiClientProvider {
  private readonly logger = new Logger(AiConfig.name);
  private client: IAiClient;

  constructor(
    @Inject(aiEnvConfig.KEY)
    private readonly config: ConfigType<typeof aiEnvConfig>,
  ) {}

  async onModuleInit() {
    await this.connectionAi();
  }

  async connectionAi(): Promise<IAiClient> {
    try {
      const provider: AiProviderType = this.config.provider;

      switch (provider) {
        case 'gemini':
          this.client = this.createGeminiClient();
          break;
        case 'openai':
        case 'groq':
        case 'deepseek':
        case 'ollama':
          throw new Error(`Proveedor de IA aún no implementado: ${provider}`);
        default:
          throw new Error(`Proveedor de IA no soportado: ${provider}`);
      }

      this.logger.log(
        `IA inicializada -> Provider: [${this.client.provider.toUpperCase()}] | Modelo: [${this.client.model}]`,
      );
      return this.client;
    } catch (error) {
      this.logger.error('connectionAi', 'debbugError', { error });
      throw error;
    }
  }

  getClient(): IAiClient {
    return this.client;
  }

  private createGeminiClient(): IAiClient {
    const { apiKey, models } = this.config.gemini;
    const timeoutMs = this.config.timeoutMs;

    if (!apiKey) {
      throw new Error('Falta GEMINI_API_KEY en el archivo .env');
    }

    return {
      provider: 'gemini',
      model: models.default,
      generateText: async (
        prompt: string,
        systemInstruction?: string,
        options?: AiGenerateOptions,
      ): Promise<string> => {
        const profile = options?.profile ?? 'default';
        const targetModel = models[profile];
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);

        const body: GeminiGenerateContentBody = {
          contents: [
            { role: options?.role ?? 'user', parts: [{ text: prompt }] },
          ],
        };

        if (systemInstruction) {
          body.systemInstruction = { parts: [{ text: systemInstruction }] };
        }

        if (
          options?.responseMimeType ||
          options?.temperature !== undefined
        ) {
          body.generationConfig = {
            ...(options.responseMimeType
              ? { responseMimeType: options.responseMimeType }
              : {}),
            ...(options.temperature !== undefined
              ? { temperature: options.temperature }
              : {}),
          };
        }

        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': apiKey,
            },
            body: JSON.stringify(body),
            signal: controller.signal,
          });

          if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Gemini Error (${res.status}): ${errText}`);
          }

          const data = (await res.json()) as GeminiGenerateContentResponse;
          return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
        } finally {
          clearTimeout(timeout);
        }
      },
    };
  }
}
