import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { AiModule } from './ai/ai.module';
import { VectorialModule } from './vectorial/vectorial.module';
import { SearchModule } from './search/search.module';
import { ElasticSearchModule } from './elastic-search/elastic-search.module';

@Module({
  imports: [PrismaModule, ChatModule, AiModule, SearchModule, ElasticSearchModule, VectorialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
