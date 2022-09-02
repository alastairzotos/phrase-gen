import { MatchType, VariableValue } from '@bitmetro/phrase-gen';
import { ProjectData } from '@bitmetro/phrase-gen-dtos';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchemma } from 'mongoose';
import { User } from './user.schema';

export type ProjectDocument = Project & Document;

@Schema({ collection: 'projects' })
export class Project implements ProjectData {
  _id: string;

  @Prop({ type: MongooseSchemma.Types.ObjectId, ref: 'users' })
  user: User;

  @Prop()
  name: string;

  @Prop()
  inputs: string[];

  @Prop()
  variables: VariableValue[];

  @Prop()
  matchType: MatchType;

  @Prop()
  lastUpdated: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
