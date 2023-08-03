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
  birthDate: Date;

  @Prop()
  gender: String;

  @Prop({require: true ,unique: true})
  email: String

  @Prop()
  phoneNumber: String

  @Prop()
  country: String

  @Prop()
  city: String

  @Prop()
  description: String

}

export const AboutSchema = SchemaFactory.createForClass(About);

