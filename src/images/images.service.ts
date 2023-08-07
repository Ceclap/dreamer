import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectMinio } from "nestjs-minio";
import { Client } from "minio";

@Injectable()
export class ImagesService {

  constructor(@InjectMinio() private readonly minioClient: Client,
  ) {}

  async upload(files) {
    if(!files)
    {
      throw new NotFoundException('User was not found');
    }
    const photos = files.map((file) => {
      const uniqueSuffix = Math.round(Math.random() * 1E9);
      const fileName = uniqueSuffix + file.originalname
      this.minioClient.putObject("dreams", fileName, file.buffer, (err, etag) => {
        if (err) {
          console.error('Error uploading image to Minio:', err);
        }
        console.log('Image uploaded successfully:', etag);
      });
      const fieldname = file.fieldname
      return {
        fieldname: fieldname,
        fileName: fileName
      };
    })
    return photos
  }
  async getPhotos(names){
    if(!names)
    {
      throw new NotFoundException('Names was not found');
    }
    const getPhoto = new Promise((resolve)=> {
      const photos = []
      names.map((name) => {
        this.minioClient.presignedGetObject("dreams", name, (err, url) => {
          if (err) {
            console.error('Eroare la obținerea URL-ului semnat:', err);
            return;
          }
          photos.push(url)
          if(photos.length === names.length)
            resolve(photos);
        });
      })
    })
    const photos = await getPhoto
    return photos
  }
}
