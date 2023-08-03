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
}

export const UserSchema = SchemaFactory.createForClass(User);

