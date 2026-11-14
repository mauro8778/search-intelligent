import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiConfig } from './ai.config';
import { aiEnvConfig } from './config/ai.env.config';
import { AiController } from './controller/ai/ai.controller';
import { AI_CLIENT_PROVIDER } from './ports/ai-client.port';
import { AiService } from './service/ai.service';
import { InputDepurationService } from './service/input-depuration.service';
import { Zod } from './service/zod.service';

@Module({
  imports: [ConfigModule.forFeature(aiEnvConfig)],
  controllers: [AiController],
  providers: [
    AiService,
    InputDepurationService,
    AiConfig,
    {
      provide: AI_CLIENT_PROVIDER,
      useExisting: AiConfig,
    },
    Zod,
  ],
  exports: [
    AiService,
    InputDepurationService,
    AiConfig,
    AI_CLIENT_PROVIDER,
    Zod,
  ],
})
export class AiModule {}
