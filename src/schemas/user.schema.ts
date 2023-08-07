import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class User extends Document{
  @Prop({unique: true,require: true})
  email: string;

  @Prop({require: true})
  passwordHash: string;

  @Prop({default: 0})
  fulfill: number;

  @Prop({default: 0})
  fulfilled: number;

  @Prop({default: 0})
  received: number;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: string;

  @Prop()
  gender: string;

  @Prop()
  phoneNumber: string

  @Prop()
  country: string

  @Prop()
  city: string

  @Prop()
  description: string

  @Prop()
  avatar: string

  @Prop()
  background: string

  @Prop({default: 'nothing'})
  subscribe: string
}

export const UserSchema = SchemaFactory.createForClass(User);

