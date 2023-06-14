import { Module } from '@nestjs/common';
import { EnvModule } from 'src/environment/environment.module';
import { IdentityModule } from 'src/integrations/identity/identity.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [EnvModule, IdentityModule],
  providers: [AuthGuard],
  exports: [IdentityModule, AuthGuard],
})
export class AuthModule {}
