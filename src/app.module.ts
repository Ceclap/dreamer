import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getMongoConfig } from "./configs/mongo.config";
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory:getMongoConfig
    }),
    MailModule,
    UserModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
