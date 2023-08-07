import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { NestMinioModule } from "nestjs-minio";

@Module({
  imports:[
    NestMinioModule.register(
      {
        endPoint: '127.0.0.1',
        port: 9000,
        useSSL: false,
        accessKey: 'minioadmin',
        secretKey: 'minioadmin',
      },
    ),
  ],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
