import { VariableValue, generateOutput } from "@bitmetro/phrase-gen";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PhrasesService {
  generatePhrases(inputs: string[], variables: VariableValue[]) {
    return generateOutput(inputs, variables);
  }
}
