import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
  _id: string;
  
  @Prop()
  email: string;

  @Prop()
  givenName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
