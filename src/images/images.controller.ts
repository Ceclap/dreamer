import { Controller, Get } from "@nestjs/common";
import { DreamsService } from "../dreams/dreams.service";
import { ImagesService } from "./images.service";

@Controller('images')
export class ImagesController {

  constructor(
    private readonly imageService:ImagesService,
  ) {}
  @Get("/")
  async get(){
    return this.imageService.getPhotos(['293593281116223256test.jpg',"293593281116223256test.jpg"])
  }
}
