export interface LoginRequest {
  code: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface LoggedInUserDetails {
  email: string;
  givenName: string;
}
