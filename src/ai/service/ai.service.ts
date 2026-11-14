import { Injectable, Logger } from '@nestjs/common';
import { INTENTION } from 'src/regex/regexIntention';
import { DepurationInputResult } from '../schemas/depuration.schema';
import { InputDepurationService } from './input-depuration.service';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly inputDepurationService: InputDepurationService,
  ) {}

  async intentionDetected(message: string) {
    try {
      return 'string';
    } catch (error) {
      this.logger.error('intentionDetected', 'debbugerror', { error });
    }
  }

  async detectionMatrizRoute(message: string): Promise<string | undefined> {
    try {
      return 'string';
    } catch (error) {
      this.logger.error('detectionMatrizRoute', 'debbugerror', { error });
    }
  }

  async depurationInput(
    message: string,
    knownAttributes?: readonly string[],
  ): Promise<DepurationInputResult> {
    return this.inputDepurationService.execute(message, knownAttributes);
  }

  async aiConversation(input: string, intention: INTENTION) {
    try {
    } catch (error) {
      this.logger.error('aiConversation', 'debbugerror', { error });
    }
  }
}
