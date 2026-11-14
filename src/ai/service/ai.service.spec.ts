import { Test, TestingModule } from '@nestjs/testing';
import {
  AI_CLIENT_PROVIDER,
  AiGenerateOptions,
  IAiClient,
  IAiClientProvider,
} from '../ports/ai-client.port';
import { AiService } from './ai.service';
import { InputDepurationService } from './input-depuration.service';
import { Zod } from './zod.service';

describe('AiService', () => {
  let service: AiService;
  let zodService: Zod;
  let generateTextMock: jest.Mock<
    Promise<string>,
    [string, string?, AiGenerateOptions?]
  >;

  beforeEach(async () => {
    generateTextMock = jest.fn();

    const mockClient: IAiClient = {
      provider: 'gemini',
      model: 'gemini-2.5-flash',
      generateText: generateTextMock,
    };

    const mockProvider: IAiClientProvider = {
      getClient: () => mockClient,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        InputDepurationService,
        Zod,
        {
          provide: AI_CLIENT_PROVIDER,
          useValue: mockProvider,
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    zodService = module.get<Zod>(Zod);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('depurationInput', () => {
    it('should call AI with fast profile in json mode and return zod-validated filters and cleanInput', async () => {
      generateTextMock.mockResolvedValueOnce(
        JSON.stringify({
          filters: [
            { attribute: 'marca', value: 'honda' },
            { attribute: 'modelo', value: 'crv' },
            { attribute: 'cilindrada', value: 750 },
          ],
          cleanInput: 'honda crv 750',
        }),
      );

      const result = await service.depurationInput('nesecito una honda crv 750');

      expect(generateTextMock).toHaveBeenCalledWith(
        'nesecito una honda crv 750',
        expect.any(String),
        expect.objectContaining({
          profile: 'fast',
          responseMimeType: 'application/json',
          temperature: 0,
        }),
      );
      expect(result).toEqual({
        filters: [
          { attribute: 'marca', value: 'honda' },
          { attribute: 'modelo', value: 'crv' },
          { attribute: 'cilindrada', value: 750 },
        ],
        cleanInput: 'honda crv 750',
      });
    });

    it('should include knownAttributes hint in system prompt when provided', async () => {
      generateTextMock.mockResolvedValueOnce(
        JSON.stringify({
          filters: [{ attribute: 'marca', value: 'honda' }],
          cleanInput: 'honda',
        }),
      );

      await service.depurationInput('busco honda', ['marca', 'modelo']);

      expect(generateTextMock).toHaveBeenCalledWith(
        'busco honda',
        expect.stringContaining('marca, modelo'),
        expect.any(Object),
      );
    });

    it('should return empty result without calling AI when input is blank', async () => {
      const result = await service.depurationInput('   ');

      expect(generateTextMock).not.toHaveBeenCalled();
      expect(result).toEqual({ filters: [], cleanInput: '' });
    });

    it('should throw when AI returns invalid JSON or invalid Zod schema', async () => {
      generateTextMock.mockResolvedValueOnce('{"filters": "invalid"}');

      await expect(service.depurationInput('honda crv')).rejects.toThrow(
        /Zod validation failed/,
      );
    });
  });

  describe('Zod.validateDepurationInput', () => {
    it('should strip markdown code fences and validate payload', () => {
      const raw =
        '```json\n{"filters":[{"attribute":"color","value":"rojo"}],"cleanInput":"remera roja"}\n```';
      expect(zodService.validateDepurationInput(raw)).toEqual({
        filters: [{ attribute: 'color', value: 'rojo' }],
        cleanInput: 'remera roja',
      });
    });
  });
});
