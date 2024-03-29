import { Module } from '@nestjs/common';
import { EnvModule } from 'src/environment/environment.module';
import { IdentityService } from 'src/integrations/identity/identity.service';

@Module({
  imports: [EnvModule],
  providers: [IdentityService],
  exports: [IdentityService],
})
export class IdentityModule {}
