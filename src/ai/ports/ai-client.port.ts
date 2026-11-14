export type AiProviderType = 'gemini' | 'openai' | 'groq' | 'deepseek' | 'ollama';

export type AiModelProfile = 'default' | 'fast';

export interface AiGenerateOptions {
  profile?: AiModelProfile;
  role?: 'user' | 'model';
  responseMimeType?: 'text/plain' | 'application/json';
  temperature?: number;
}

export const AI_CLIENT_PROVIDER = Symbol('AI_CLIENT_PROVIDER');

export interface IAiClient {
  readonly provider: AiProviderType;
  readonly model: string;
  generateText(
    prompt: string,
    systemInstruction?: string,
    options?: AiGenerateOptions,
  ): Promise<string>;
}

export interface IAiClientProvider {
  getClient(): IAiClient;
}
