import { Module } from '@nestjs/common';
import { DreamsController } from './dreams.controller';
import { DreamsService } from './dreams.service';
import { NestMinioModule } from 'nestjs-minio';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../schemas/user.schema';
import { DreamSchema } from '../schemas/dream.schema';
import { ImagesService } from '../images/images.service';

@Module({
  imports: [
	NestMinioModule.register(
		{
		endPoint: '127.0.0.1',
		port: 9000,
		useSSL: false,
		accessKey: 'minio',
		secretKey: 'miniosecret',
		},
	),
	MongooseModule.forFeature([
		{
			name:'Dream',
			schema:DreamSchema
		},
		{
		name:'User',
		schema:UserSchema
		}
		]),

],
  controllers: [DreamsController],
  providers: [DreamsService, ImagesService]
})
export class DreamsModule {}
