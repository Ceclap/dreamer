import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../schemas/user.schema";
import { MailService } from "../mail/mail.service";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AboutSchema } from "../schemas/about.schema";


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:"User",
        schema:UserSchema
      },
      {
        name:"About",
        schema:AboutSchema
      }
    ]),
    JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
      })
  ],
  controllers: [AuthController],
  providers: [AuthService, MailService, ConfigService]
})
export class AuthModule {}

