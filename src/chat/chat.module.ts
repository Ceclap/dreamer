import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import {MongooseModule} from '@nestjs/mongoose';
import {MessageSchema} from '../schemas/message.schema';
import { ChatController } from './chat.controller';
import {UserSchema} from '../schemas/user.schema';

@Module({
  imports:[
		MongooseModule.forFeature([
			{
				name:'Message',
				schema:MessageSchema
			},
			{
				name:'User',
				schema:UserSchema
			}
  ]),
  ],
  providers: [ChatService],
  controllers: [ChatController]
})
export class ChatModule {}
