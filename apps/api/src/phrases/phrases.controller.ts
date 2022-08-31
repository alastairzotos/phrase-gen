import { VariableValue } from "@bitmetro/phrase-gen";
import { Body, Controller, Post } from "@nestjs/common";
import { PhrasesService } from "./phrases.service";

interface GenerateBody {
  inputs: string[];
  variables: VariableValue[];
}

@Controller('phrases')
export class PhrasesController {
  constructor(private readonly phrasesService: PhrasesService) {}

  @Post()
  generatePhrases(
    @Body() body: GenerateBody
  ) {
    return this.phrasesService.generatePhrases(body.inputs, body.variables);
  }
}
