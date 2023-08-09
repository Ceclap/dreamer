import {Body, Controller, Post, UseGuards, Request} from '@nestjs/common';
import {ChatService} from './chat.service';
import {MessageDto} from './types/message';
import {AuthGuard} from '../auth/auth.guard';

@Controller('chat')
export class ChatController {
	constructor(private chatService:ChatService) {}

	@UseGuards(AuthGuard)
	@Post()
	async createMessage(@Body() body:MessageDto, @Request() req: Request){
		return this.chatService.createMessage(body,req);
	}

}
