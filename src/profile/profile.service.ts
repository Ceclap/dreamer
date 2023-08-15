import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel, Prop} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../schemas/user.schema';
import {json} from 'express';

@Injectable()
export class ProfileService {
	constructor(
		@InjectModel('Comment') private readonly CommentModel: Model<Comment>,
		@InjectModel('User') private readonly UserModel:Model<User>,
	) {
	}
	async createComment(body, req){
		try{
			const userId = req.user.id;
			const user = await this.UserModel.findById(userId).exec();
			const username = `${user.firstName} ${user.lastName}`;
			const profileId = await this.UserModel.findById(body.profileId).exec();
			if(!profileId)
			{
				throw new NotFoundException('User was not found');
				return 'User was not found';
			}
			const doc = new this.CommentModel({
				body: body.body,
				profileId: body.profileId,
				username: username,
				userId: userId,
				parentId: body.parentId,
				createdAt: new Date(),
			});

			const comment = await doc.save();

			const respons = {
				message: 'succes',
				comment_id: comment._id,
			};

			return JSON.stringify(respons);
		}
		catch (e)
		{
			console.log(e);
			return 'Error';
		}
	}

	async modifyComment(body){
		try{
			const commentID = body.commentId;
			if(!commentID)
			{
				throw new NotFoundException('Comment was not found');
				return 'Comment was not found';
			}
			await this.CommentModel.findByIdAndUpdate(commentID, {body:body.body});

			const respons = {
				message: 'succes',
				comment_id: commentID,
			};

			return JSON.stringify(respons);
		}
		catch (e) {
			console.log(e);
			return 'Error';
		}
	}

	async deleteComment(body){
		try{
			const commentID = body.commentId;
			if(!commentID)
			{
				throw new NotFoundException('Comment was not found');
				return 'Comment was not found';
			}
			await this.CommentModel.deleteMany({parentId:commentID});
			await this.CommentModel.deleteOne({_id:commentID});

			const respons = {
				message: 'succes',
			};

			return JSON.stringify(respons);
		}
		catch (e) {
			console.log(e);
			return 'Error';
		}
	}
}
