import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { InjectMinio } from 'nestjs-minio';
import { Client } from 'minio';
import { readableStreamLikeToAsyncGenerator } from 'rxjs/internal/util/isReadableStreamLike';
import { DreamsService } from '../dreams/dreams.service';
import { ImagesService } from '../images/images.service';
import { logger } from '@typegoose/typegoose/lib/logSettings';

@Injectable()
export class UserService {

  constructor(
	private readonly imagesService:ImagesService,
	@InjectMinio() private readonly minioClient: Client,
	@InjectModel('User') private readonly UserModel:Model<User>,
	){}
  async modify(req,body,files){
	try {
		const id = req.user.id;
		const about = await this.UserModel.findById(id);
		if (!about) {
		throw new NotFoundException('User was not found');
		}
		if(!files)
		{
		console.log('Images was not found');
		}
		else{
		const images = this.imagesService.upload(files);
		images.then(images => {
			images.map(async (image) => {
			if (image.fieldname === 'avatar') {
				await this.UserModel.updateOne({ _id: id }, { avatar: image.fileName });
			}
			if (image.fieldname === 'background') {
				await this.UserModel.updateOne({ _id: id }, { background: image.fileName });
			}
			});
		});
		}
		await this.UserModel.findByIdAndUpdate(id,
		{
			firstName:body.firstName,
			lastName:body.lastName,
			birthDate:body.birthDate,
			gender:body.gender,
			phoneNumber:body.phoneNumber,
			country:body.country,
			city:body.city,
			description:body.description
		}).exec();

		const respons = {
		message: 'succes',
		id: about._id,
		};

		return JSON.stringify(respons);

	} catch (err) {
		console.log(err);
	}
  }
  async get(req){
	try{
		let id = req.params.id;
		if(!id) {
		id= req.user.id;
		}
		const user = await this.UserModel.findById(id).exec();
		if (!user) {
		throw new NotFoundException('User was not found');
		}
		user.passwordHash ='';
		return user;
	}
	catch (e) {
		console.log(e);
	}
  }
  async getAll(){
	try{
		const users = await this.UserModel.find();
		if (!users) {
		throw new NotFoundException('User was not found');
		}
		const data = [];
		users.map((user)=>{
		data.push({
			id :  user._id,
			firstName: user.firstName,
			lastName: user.lastName
		});
		});
		return data;
	}
	catch (e) {
		console.log(e);
	}
  }
  async subsribe(req, body){
	const id = req.user.id;
	const user = await this.UserModel.findById(id).exec();
	if(!user)
	{
		throw new NotFoundException('User was not found');
	}
	const new_fulfill = user.fulfill + body.nrDreams;
	await this.UserModel.findByIdAndUpdate(id,{subscribe: body.pack, fulfill:new_fulfill});
	console.log(body.pack);
	console.log(new_fulfill);
	const respons = {
		message: 'succes',
		id: user._id,
	};
	return respons;
  }

}

