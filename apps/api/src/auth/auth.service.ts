import { Injectable } from "@nestjs/common";
import { LoginResponse, LoggedInUserDetails } from '@bitmetro/phrase-gen-dtos';
import { EnvService } from "src/environment/environment.service";

import { OAuth2Client } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly client: OAuth2Client;

  constructor(private readonly env: EnvService) {
    this.client = new OAuth2Client({
      clientId: env.get().googleClientId,
      clientSecret: env.get().googleClientSecret,
      redirectUri: env.get().frontendUrl,
    })
  }

  async loginWithGoogle(code: string): Promise<LoginResponse> {
    const { tokens: { id_token } } = await this.client.getToken(code);

    const { email, given_name: givenName } = jwt.decode(id_token) as { email: string, name: string, given_name: string, family_name: string };

    const userDetails: LoggedInUserDetails = { email, givenName }

    return {
      accessToken: jwt.sign(userDetails,this.env.get().jwtSigningKey)
    }
  }
}
