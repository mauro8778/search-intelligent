import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from 'src/chat/service/chat/chat.service';

@Controller('chat')
export class ChatController {
    constructor(
        private readonly chatService: ChatService
    ) { }
    @Post('message')
    async MessageClient(@Body() body: any) {
        return this.chatService.messageClient(body)
    }
}
