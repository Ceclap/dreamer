import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from '../schemas/user.schema';
import {CommentSchema} from '../schemas/comment.schema';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from '../auth/constants';

@Module({
  imports:[
	MongooseModule.forFeature([
		{
		name:'User',
		schema:UserSchema
		},
		{
		name:'Comment',
		schema:CommentSchema
		},
	]),
	JwtModule.register({
		global: true,
		secret: jwtConstants.secret,
	})
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
