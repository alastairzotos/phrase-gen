import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { EnvModule } from './environment/environment.module';
import { EnvService } from './environment/environment.service';
import { HealthModule } from './features/health/health.module';
import { PhrasesModule } from './features/phrases/phrases.module';
import { ProjectsModule } from './features/projects/projects.module';
import { IdentityModule } from 'src/integrations/identity/identity.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvModule,
    AuthModule,
    PhrasesModule,
    ProjectsModule,
    HealthModule,
    IdentityModule,
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        uri: envService.get().dbConnectionString,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
