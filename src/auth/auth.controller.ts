import { Body, Controller, Get, Response, Post, Request, UseGuards, Query, Patch } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto } from "./dto/create-user.dto";
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post(`sign-up`)
  async signUp(@Body() body: CreateUserDto) {
	  return this.authService.singUp(body);
  }

  @Post(`sign-in`)
  async signIn(@Body() body: CreateUserDto) {
    return this.authService.singIn(body);
  }

  @Get('/recover')
  async recoverEmail(@Body() body:CreateUserDto){
    return this.authService.recoverEmail(body)
  }

  @Patch('/recover')
  async recover(@Body() body:CreateUserDto){
    return this.authService.recover(body)
  }


  @Get('confirmationEmail/:token')
  async confirmationEmail(@Request() req, @Response() res){
    return this.authService.confirmationEmail(req, res);
  }
}
