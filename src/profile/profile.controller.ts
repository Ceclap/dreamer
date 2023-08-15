import {Body, Controller, Post, UseGuards, Request, Patch, Delete} from '@nestjs/common';
import {ProfileService} from './profile.service';
import {BodyDto} from './Dto/body.dto';
import {AuthGuard} from '../auth/auth.guard';

@Controller()
export class ProfileController {

	constructor(private readonly profileService : ProfileService ) {
	}

	@UseGuards(AuthGuard)
	@Post('/createComment')
	async createComment(@Body() body:BodyDto, @Request() req:Request){
		return this.profileService.createComment(body, req);
	}

	@UseGuards(AuthGuard)
	@Patch('/modifyComment')
	async modifyComment(@Body() body) {
		return this.profileService.modifyComment(body);
	}


	@UseGuards(AuthGuard)
	@Delete('/deleteComment')
	async deleteComment(@Body() body) {
		return this.profileService.deleteComment(body);
	}
}
