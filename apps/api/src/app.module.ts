import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { EnvModule } from './environment/environment.module';
import { EnvService } from './environment/environment.service';
import { HealthModule } from './health/health.module';
import { PhrasesModule } from './phrases/phrases.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EnvModule,
    AuthModule,
    UsersModule,
    PhrasesModule,
    ProjectsModule,
    HealthModule,
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        uri: envService.get().dbConnectionString
      }),
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
