import { MatchType, VariableValue } from "@bitmetro/phrase-gen";

export interface ProjectData {
  _id?: string;
  name: string;
  ownerId: string;
  inputs: string[];
  variables: VariableValue[];
  matchType: MatchType;
  lastUpdated: Date;
}

export type ProjectListItem = Pick<ProjectData, '_id' | 'name'>;
