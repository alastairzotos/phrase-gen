import { FbLoginDetails, GoogleLoginRequest, LoginResponse } from '@bitmetro/phrase-gen-dtos';
import { HttpService } from "./http.service";

export interface IAuthService {
  loginWithGoogle: (authCode: string) => Promise<string>;
  loginWithFacebook: (details: FbLoginDetails) => Promise<string>;
}

export class AuthService extends HttpService implements IAuthService {
  async loginWithGoogle(code: string): Promise<string> {
    const { data } = await this.httpClient.post<GoogleLoginRequest, { data: LoginResponse }>(`/auth/google`, { code })

    return data.accessToken;
  }

  async loginWithFacebook(details: FbLoginDetails): Promise<string> {
    const  { data } = await this.httpClient.post<FbLoginDetails, { data: LoginResponse }>('/auth/facebook', details);
    return data.accessToken;
  }
}
