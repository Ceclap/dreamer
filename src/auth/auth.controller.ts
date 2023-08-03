import { Body, Controller, Get, Response, Post, Request, UseGuards, Query } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "./auth.guard";
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

  @Get('confirmationEmail/:token')
  async confirmationEmail(@Request() req, @Response() res){
    return this.authService.confirmationEmail(req, res);
  }
}
