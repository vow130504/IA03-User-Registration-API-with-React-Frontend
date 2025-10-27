// src/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true }) // [cite: 9]
  email: string;

  @Prop({ required: true }) // [cite: 10]
  password: string;

  @Prop({ default: Date.now }) // [cite: 11]
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);