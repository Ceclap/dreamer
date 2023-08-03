import { Body, Controller, Get, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { UserService } from "./user.service";
import { AboutDto } from "./dto/about.dto";

@Controller()


export class UserController {

  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Patch('/about')
  async about(@Request() req: Request,@Body() body:AboutDto){
    return this.userService.modify(req, body)
  }

  @UseGuards(AuthGuard)
  @Get('/about')
  async getAbout(@Request() req: Request){
    return this.userService.get(req)
  }

  @Get('/aboutById/:id')
  async getAboutById(@Request() req: Request){
    return this.userService.getById(req)
  }
}
