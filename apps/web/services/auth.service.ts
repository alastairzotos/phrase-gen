import { LoginRequest, LoginResponse } from '@bitmetro/phrase-gen-dtos';
import { HttpService } from "./http.service";

export interface IAuthService {
  loginWithGoogle: (authCode: string) => Promise<string>;
}

export class AuthService extends HttpService implements IAuthService {
  async loginWithGoogle(code: string): Promise<string> {
    const { data } = await this.httpClient.post<LoginRequest, { data: LoginResponse }>(`/auth/login-google`, { code })

    return data.accessToken;
  }
}
