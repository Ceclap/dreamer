import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { AboutDto } from './dto/about.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { SubsribeDto } from './dto/subsribe.dto';

@Controller()


export class UserController {

  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post('/about')
  @UseInterceptors(AnyFilesInterceptor())
  async about(@UploadedFiles() files: Array<Express.Multer.File>, @Request() req: Request,@Body() body:AboutDto){
	return this.userService.modify(req, body, files);
  }

  @UseGuards(AuthGuard)
  @Get('/about')
  async getAbout(@Request() req: Request){
	return this.userService.get(req);
  }

  @Get('/aboutById/:id')
  async getAboutById(@Request() req: Request){
	return this.userService.get(req);
  }

  @Get('/usersAll')
  async getAll(){
	return this.userService.getAll();
  }

  @UseGuards(AuthGuard)
  @Patch('/subsribe')
  async subsribe(@Request() req:Request,@Body() body:SubsribeDto ){
	return  this.userService.subsribe(req,body);
  }
}
