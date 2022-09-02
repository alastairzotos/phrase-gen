import { LoggedInUserDetails } from '@bitmetro/phrase-gen-dtos';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User implements LoggedInUserDetails {
  _id: string;
  
  @Prop()
  email: string;

  @Prop()
  givenName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
