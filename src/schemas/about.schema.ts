import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as mongoose from "mongoose";

@Schema()
export class About extends Document{
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User',unique: true,require: true})
  creator: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: string;

  @Prop()
  gender: string;

  @Prop({require: true ,unique: true})
  email: string

  @Prop()
  phoneNumber: string

  @Prop()
  country: string

  @Prop()
  city: string

  @Prop()
  description: string

}

export const AboutSchema = SchemaFactory.createForClass(About);

