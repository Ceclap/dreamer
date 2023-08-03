import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import path from "path";
import { InjectMinio } from "nestjs-minio";
import { Client } from "minio";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.schema";
import { Dream } from "../schemas/dream.schema";

@Injectable()
export class DreamsService {

  constructor(
    @InjectMinio() private readonly minioClient: Client,
    @InjectModel('Dream') private readonly DreamModel: Model<Dream>,
  ){}

  async post(req,body,files) {
    try {
      if (!files) {
        throw new BadRequestException('Files not found');
      }

      const uploadedFiles = files.map((file) => {
        const uniqueSuffix = Math.round(Math.random() * 1E9);
        const fileName = uniqueSuffix + file.originalname
        this.minioClient.putObject("dreams", fileName, file.buffer, (err, etag) => {
          if (err) {
            console.error('Error uploading image to Minio:', err);
          }
          console.log('Image uploaded successfully:', etag);
        });
        return fileName
      })
      const doc = new this.DreamModel({
        creator: req.user.id,
        image: uploadedFiles,
        description: body.description,
        amount: body.amount
      });
      const post = await doc.save();

      const respons = {
        message: "succes",
        post_id: post._id,
        user_id: post.creator
      };
      return respons
    }
    catch (e)
    {
      console.log(e);
    }
  }
}
