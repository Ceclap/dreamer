import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { About } from "../schemas/about.schema";

@Injectable()
export class UserService {

  constructor(
    @InjectModel('About') private readonly AboutModel:Model<About>,
    ){}
  async modify(req,body){
    try {
      const id = req.user.id;
      const about = await this.AboutModel.findOne({ creator: id });
      if (!about) {
        throw new NotFoundException('User was not found');
      }

      await this.AboutModel.updateMany({ creator: id },
        {
          firstName:body.firstName,
          lastName:body.lastName,
          birthDate:body.birthDate,
          gender:body.gender,
          phoneNumber:body.phoneNumber,
          country:body.country,
          city:body.city,
          description:body.description
        }).exec();

      const respons = {
        message: "succes",
        about_id: about._id,
      }

      return JSON.stringify(respons)

    } catch (err) {
      console.log(err);
    }
  }
  async get(req){
    try{
      const id = req.user.id
      console.log(id);
      const user = await this.AboutModel.findOne({ creator: id }).exec();
      if (!user) {
        throw new NotFoundException('User was not found');
      }
      return user
    }
    catch (e) {
      console.log(e)
    }
  }
  async getById(req){
    try{
      const id =req.params.id;
      const user = await this.AboutModel.findOne({ creator: id }).exec();
      if (!user) {
        throw new NotFoundException('User was not found');
      }
      return user
    }
    catch (e) {
      console.log(e)
    }
  }
  async getAll(){
    try{
      const users = await this.AboutModel.find();
      if (!users) {
        throw new NotFoundException('User was not found');
      }
      const data = []
      users.map((user)=>{
        data.push({
          creator :  user.creator,
          firstName: user.firstName,
          lastName: user.lastName
        })
      })
      return data
    }
    catch (e) {
      console.log(e)
    }
  }
}
