import {MessageDto} from './message';
export interface ServertoClient{
	newMessage: (payload:MessageDto)=>void;
}