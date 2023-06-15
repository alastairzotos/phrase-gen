import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IdentityService } from 'src/integrations/identity/identity.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly identityService: IdentityService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles && roles.includes('all')) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    try {
      const identity = await this.identityService.verifyIdentity(request.headers);

      if (!identity) {
        return false;
      }

      request.principal = identity;

      return true;
    } catch {
      return false;
    }
  }
}
