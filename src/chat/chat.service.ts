import {Injectable, OnModuleInit} from '@nestjs/common';
import {MessageDto} from './types/message';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../schemas/user.schema';
import {Message} from '../schemas/message.schema';
import {io, Socket} from 'socket.io-client';
import {OnGatewayDisconnect} from '@nestjs/websockets';

@Injectable()
export class ChatService implements OnModuleInit, OnGatewayDisconnect {
	public socketClient: Socket;
	public socketOptions;

	constructor(
		@InjectModel('Message') private readonly MessageModel: Model<Message>,
		@InjectModel('User') private readonly UserModel: Model<User>,
	) {
		this.socketOptions = {
			transportOptions: {
				polling: {
					extraHeaders: {
						Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZpY3Rvcl93ZWJzdG9ybSIsInJvb21JZCI6IjEyMyIsImlhdCI6MTY5MTc1MjEzMn0.msNDXPOIzp-n3nESl3uVJyQjw30nRJ0nlHnLDDIiVRE',
					}
				}
			}
		};
		this.socketClient = io('http://localhost:3001/', this.socketOptions);
	}

	async onModuleInit() {
		await this.receiveMessage();
	}

	handleDisconnect() {
		console.log('disconect');
	}

	async receiveMessage() {
		this.socketClient.on('connect', () => {
			console.log('connected');
		});
		this.socketClient.on('alert', (data) => {
			console.log(data);
		})
		this.socketClient.on('newMessage', (data) => {
			console.log(data);
		});
	}

	async createMessage(message: MessageDto, req) {
		this.socketClient.emit('message', message);
		return 'succes';
	}
}
