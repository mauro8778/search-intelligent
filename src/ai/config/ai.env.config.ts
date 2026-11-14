import { registerAs } from '@nestjs/config';
import { AiModelProfile, AiProviderType } from '../ports/ai-client.port';

export interface GeminiConfig {
  apiKey: string;
  models: Record<AiModelProfile, string>;
}

export interface AiModuleEnvConfig {
  provider: AiProviderType;
  timeoutMs: number;
  gemini: GeminiConfig;
}

export const aiEnvConfig = registerAs(
  'ai',
  (): AiModuleEnvConfig => ({
    provider: (process.env.AI_PROVIDER?.toLowerCase() || 'gemini') as AiProviderType,
    timeoutMs: Number(process.env.AI_TIMEOUT_MS) || 15000,
    gemini: {
      apiKey: process.env.GEMINI_API_KEY ?? '',
      models: {
        default: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
        fast: process.env.GEMINI_FLASH_LITE_MODEL || 'gemini-2.5-flash-lite',
      },
    },
  }),
);
