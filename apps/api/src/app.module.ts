import { Module } from '@nestjs/common';
import { PhrasesModule } from './phrases/phrases.module';

@Module({
  imports: [PhrasesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
