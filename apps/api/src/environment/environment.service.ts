import { Injectable } from '@nestjs/common';


@Injectable()
export class EnvService {
  private readonly env_vars = {
    frontendUrl: process.env.FRONTEND_URL as string,
    googleClientId: process.env.GOOGLE_CLIENT_ID as string,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    jwtSigningKey: process.env.JWT_SIGNING_KEY as string,
  };

  get() {
    return this.env_vars;
  }
}
