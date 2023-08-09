import {Injectable, OnModuleInit} from '@nestjs/common';
import {MessageDto} from './types/message';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../schemas/user.schema';
import {Message} from '../schemas/message.schema';
import {io} from 'socket.io-client';

@Injectable()
export class ChatService implements OnModuleInit{
	public socketClient = io('http://localhost:3001/');
	constructor(
		@InjectModel('Message') private readonly MessageModel:Model<Message>,
		@InjectModel('User') private readonly UserModel:Model<User>,
	) {}

	async onModuleInit() {
		 await this.receiveMessage();
	}

	async receiveMessage(){
		this.socketClient.on('connect',()=>{
			console.log('connected');
		});
		this.socketClient.on('message',(payload)=>{
			console.log(payload);
		});
	}

	async createMessage(message:MessageDto,req){
		const id = req.user.id;
		const creator = await this.UserModel.findById(id);
		const doc = new this.MessageModel({
			message:message.message,
			roomId:message.roomId,
			creator:creator.email,
			createAt:new Date()
		});
		const sendedMessage = await doc.save();
		return sendedMessage;
	}
}
