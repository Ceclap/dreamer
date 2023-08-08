import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectMinio } from 'nestjs-minio';
import { Client } from 'minio';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Dream } from '../schemas/dream.schema';
import { ImagesService } from '../images/images.service';

@Injectable()
export class DreamsService {

  constructor(
	@InjectMinio() private readonly minioClient: Client,
	private readonly imagesService:ImagesService,
	@InjectModel('Dream') private readonly DreamModel: Model<Dream>,
	@InjectModel('User') private readonly UserModel: Model<User>,
  ){}

  async post(req,body,files) {
	try {
		if (!files) {
		console.log('Files not found');
		}
		const images = await this.imagesService.upload(files);
		const photos = [];
		images.map((image)=>{
		const {fieldname,fileName} = image;
		photos.push(fileName);
		});
		const data = JSON.parse(body.dream);
		const doc = new this.DreamModel({
		creator: req.user.id,
		image: photos,
		description: data.description,
		amount: data.amount
		});

		const post = await doc.save();

		const respons = {
		message: 'succes',
		post_id: post._id,
		user_id: post.creator
		};
		return respons;
	}
	catch (e)
	{
		console.log(e);
		return 'Erorr';
	}
  }
  async get(req){
	try{
		const id = req.params.id;
		const dream = await this.DreamModel.findById(id);
		if (!dream) {
		throw new NotFoundException('Post was not found');
		}
		const user = await this.UserModel.findById(dream.creator);
		const photos = await this.imagesService.getPhotos(dream.image);
		const avatar = await this.imagesService.getPhotos([user.avatar]);

		return {
		creator: dream.creator,
		image: photos,
		avatar: avatar,
		firstName: user.firstName,
		lastName: user.lastName,
		description: dream.description,
		amount: dream.amount,
		received: user.received,
		fulfill: user.fulfill,
		fulfilled: user.fulfilled
		};

	}
	catch (e) {
		console.log(e);
		return 'Erorr';
	}
  }
  async getAll(){
	try {
		const dreams = await this.DreamModel.find();
		const allDreams = new Promise((resolve) => {
		const array = [];
		dreams.map(async (dream) => {
			const user = await this.UserModel.findById(dream.creator);
			const photos = await this.imagesService.getPhotos(dream.image);
			const avatar = await this.imagesService.getPhotos([user.avatar]);
			const response = {
			creator: dream.creator,
			image: photos,
			avatar: avatar,
			firstName: user.firstName,
			lastName: user.lastName,
			description: dream.description,
			amount: dream.amount,
			received: user.received,
			fulfill: user.fulfill,
			fulfilled: user.fulfilled
			};
			array.push(response);
			if (array.length === dreams.length) {
			resolve(array);
			}
		});
		});
		return await allDreams;
	} catch (e) {
		console.log(e);
		return 'Error';
	}
  }
}
