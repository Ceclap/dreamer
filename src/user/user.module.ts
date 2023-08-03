import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";
import { AuthGuard } from "../auth/auth.guard";

@Module({
  imports:[MongooseModule.forFeature([
    {
      name:"User",
      schema:UserSchema
    }
  ]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    })
  ],
  controllers: [UserController],
  providers: [UserService,AuthGuard]
})
export class UserModule {}
