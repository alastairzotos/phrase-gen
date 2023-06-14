import { Injectable } from '@nestjs/common';
import { IdentityProvider } from '@bitmetro/auth-node';
import { EnvService } from 'src/environment/environment.service';

@Injectable()
export class IdentityService {
  private identityProvider: IdentityProvider;

  constructor(env: EnvService) {
    this.identityProvider = new IdentityProvider({
      apiKey: env.get().idServerApiKey,
    });
  }

  async verifyIdentity(accessToken: string) {
    return await this.identityProvider.verifyIdentity(accessToken);
  }

  async verifyPassword(identityId: string, password: string) {
    return await this.identityProvider.verifyPassword(identityId, password);
  }
}
