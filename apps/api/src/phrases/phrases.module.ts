import { Module } from "@nestjs/common";
import { PhrasesController } from "./phrases.controller";
import { PhrasesService } from "./phrases.service";

@Module({
  controllers: [PhrasesController],
  providers: [PhrasesService],
  exports: [],
})
export class PhrasesModule {}
