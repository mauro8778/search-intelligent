import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import {
  DepurationInputResult,
  DepurationInputSchema,
} from '../schemas/depuration.schema';

export type {
  DepurationFilter,
  DepurationInputResult,
} from '../schemas/depuration.schema';

@Injectable()
export class Zod {
  /**
   * Parses and validates the raw JSON string returned by the AI for `depurationInput`.
   */
  validateDepurationInput(rawResponse: string): DepurationInputResult {
    return this.parseAndValidate(
      rawResponse,
      DepurationInputSchema,
      'depurationInput',
    );
  }

  private parseAndValidate<T>(
    rawResponse: string,
    schema: z.ZodType<T>,
    context: string,
  ): T {
    const sanitizedJson = this.stripCodeFences(rawResponse);

    let parsed: unknown;
    try {
      parsed = JSON.parse(sanitizedJson);
    } catch (error) {
      throw new Error(
        `Invalid JSON returned by ${context} AI: ${error instanceof Error ? error.message : 'Unknown parse error'}`,
      );
    }

    const result = schema.safeParse(parsed);
    if (!result.success) {
      const issues = result.error.issues
        .map((issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`)
        .join('; ');
      throw new Error(`Zod validation failed for ${context}: ${issues}`);
    }

    return result.data;
  }

  private stripCodeFences(raw: string): string {
    const trimmed = raw.trim();
    const match = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    return match ? match[1].trim() : trimmed;
  }
}
