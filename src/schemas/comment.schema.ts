import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import mongoose from 'mongoose';
import {Dream} from './dream.schema';

@Schema()
export class Comment extends Document{
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User',require: true})
	userId: string;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User',require: true})
	profileId: string;

	@Prop()
	username: string;

	@Prop()
	body: string;

	@Prop({default:null})
	parentId: string;

	@Prop()
	createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

