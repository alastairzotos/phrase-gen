import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { EnvModule } from './environment/environment.module';
import { EnvService } from './environment/environment.service';
import { HealthModule } from './health/health.module';
import { PhrasesModule } from './phrases/phrases.module';
import { ProjectsModule } from './projects/projects.module';
import { IdentityModule } from 'src/identity/identity.module';

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
