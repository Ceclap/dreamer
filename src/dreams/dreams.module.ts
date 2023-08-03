import { Module } from '@nestjs/common';
import { DreamsController } from './dreams.controller';
import { DreamsService } from './dreams.service';
import { NestMinioModule } from "nestjs-minio";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../schemas/user.schema";
import { DreamSchema } from "../schemas/dream.schema";

@Module({
  imports: [
    NestMinioModule.register(
      {
      endPoint: '127.0.0.1',
      port: 9000,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
      },
    ),
    MongooseModule.forFeature([
        {
          name:"Dream",
          schema:DreamSchema
        }
        ]),
],
  controllers: [DreamsController],
  providers: [DreamsService]
})
export class DreamsModule {}
