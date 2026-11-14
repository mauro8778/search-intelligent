import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AI_CLIENT_PROVIDER,
  type IAiClientProvider,
} from '../ports/ai-client.port';
import { buildDepurationSystemPrompt } from '../prompts/depuration.prompt';
import { DepurationInputResult } from '../schemas/depuration.schema';
import { Zod } from './zod.service';

@Injectable()
export class InputDepurationService {
  private readonly logger = new Logger(InputDepurationService.name);

  constructor(
    @Inject(AI_CLIENT_PROVIDER)
    private readonly aiClientProvider: IAiClientProvider,
    private readonly zodService: Zod,
  ) {}

  async execute(
    message: string,
    knownAttributes?: readonly string[],
  ): Promise<DepurationInputResult> {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return { filters: [], cleanInput: '' };
    }

    try {
      const client = this.aiClientProvider.getClient();
      const systemPrompt = buildDepurationSystemPrompt(knownAttributes);
      const rawResponse = await client.generateText(
        trimmedMessage,
        systemPrompt,
        {
          profile: 'fast',
          responseMimeType: 'application/json',
          temperature: 0,
        },
      );

      return this.zodService.validateDepurationInput(rawResponse);
    } catch (error) {
      this.logger.error('execute', { error });
      throw error;
    }
  }
}
