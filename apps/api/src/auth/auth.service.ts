import { Injectable } from "@nestjs/common";
import { LoginResponse, UserDetails, FbLoginDetails, LoggedInUserDetails } from '@bitmetro/phrase-gen-dtos';
import { EnvService } from "src/environment/environment.service";

import { OAuth2Client } from 'google-auth-library';
import * as jwt from 'jsonwebtoken';
import { UsersService } from "src/users/users.service";
import { User } from "src/schemas/user.schema";

@Injectable()
export class AuthService {
  private readonly googleOAuth2Client: OAuth2Client;

  constructor(
    private readonly env: EnvService,
    private readonly usersService: UsersService,
  ) {
    this.googleOAuth2Client = new OAuth2Client({
      clientId: env.get().googleClientId,
      clientSecret: env.get().googleClientSecret,
      redirectUri: env.get().frontendUrl,
    })
  }

  async loginWithGoogle(code: string): Promise<LoginResponse> {
    const { tokens: { id_token } } = await this.googleOAuth2Client.getToken(code);

    const { email, given_name: givenName } = jwt.decode(id_token) as { email: string, name: string, given_name: string, family_name: string };

    const userDetails: UserDetails = { email, givenName };

    const user = await this.registerUserIfNotExists(userDetails);

    return {
      accessToken: this.generateAccessToken(user)
    }
  }

  async loginWithFacebook(details: FbLoginDetails): Promise<LoginResponse> {
    const { email, first_name: givenName } = details;

    const userDetails: UserDetails = { email, givenName };

    const user = await this.registerUserIfNotExists(userDetails);

    return {
      accessToken: this.generateAccessToken(user)
    }
  }

  private generateAccessToken({ _id, email, givenName }: User) {
    return jwt.sign({ _id, email, givenName }, this.env.get().jwtSigningKey);
  }
  
  private async registerUserIfNotExists(details: UserDetails) {
    let user = await this.usersService.getUserByEmail(details.email);

    if (!user) {
      user = await this.usersService.createUser(details);
    }

    return user;
  }
}
