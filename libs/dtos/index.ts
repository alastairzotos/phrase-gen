import { VariableValue } from "@bitmetro/phrase-gen";

export interface GoogleLoginRequest {
  code: string;
}

export interface FbLoginDetails {
  email?: string;
  first_name: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface UserDetails {
  email: string;
  givenName: string;
}

export interface LoggedInUserDetails extends UserDetails {
  _id: string;
}

export interface ProjectData {
  _id?: string;
  name: string;
  inputs: string[];
  variables: VariableValue[];
  lastUpdated: Date;
}

export type ProjectListItem = Pick<ProjectData, '_id' | 'name'>;
