import { Module } from '@nestjs/common';
import { AiModule } from 'src/ai/ai.module';
import { SearchModule } from 'src/search/search.module';
import { VectorialModule } from 'src/vectorial/vectorial.module';
import { ChatService } from './service/chat/chat.service';
import { ChatController } from './controller/chat/chat.controller';

@Module({
  imports: [VectorialModule, SearchModule, AiModule],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
