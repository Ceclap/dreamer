import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Dream extends Document{
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User',unique: true,require: true})
  creator: string;

  @Prop({require: true})
  description: string;

  @Prop({default: []})
  image: Array<string>;

  @Prop({require: true})
  amount: number;

  @Prop({default: 0})
  donated: number;

}

export const DreamSchema = SchemaFactory.createForClass(Dream);

