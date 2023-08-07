import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Response
} from "@nestjs/common";
import { InjectMinio } from "nestjs-minio";
import { Client } from "minio";
import { AuthGuard } from "../auth/auth.guard";
import { DreamsService } from "./dreams.service";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";

@Controller()
export class DreamsController {

  constructor(
    private readonly dreamsService:DreamsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/post')
  @UseInterceptors(AnyFilesInterceptor())
  async post(@UploadedFiles() files: Array<Express.Multer.File>, @Request() req, @Body() body){
    return this.dreamsService.post(req,body,files);
  }

  @Get('/dream/:id')
  async get(@Request() req: Request)
  {
    return this.dreamsService.get(req);
  }

  @Get('/dreamsAll')
  async getAll()
  {
    return this.dreamsService.getAll();
  }




}
