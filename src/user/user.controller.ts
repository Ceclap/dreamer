import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";

@Controller('user')


export class UserController {

  @UseGuards(AuthGuard)
  @Get('/')
  async test(){
    return "test"
  }

}
