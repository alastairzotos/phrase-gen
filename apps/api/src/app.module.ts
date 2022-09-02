import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { EnvModule } from './environment/environment.module';
import { HealthModule } from './health/health.module';
import { PhrasesModule } from './phrases/phrases.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvModule,
    AuthModule,
    PhrasesModule,
    HealthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
