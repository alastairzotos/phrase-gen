import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { PhrasesModule } from './phrases/phrases.module';

@Module({
  imports: [PhrasesModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
