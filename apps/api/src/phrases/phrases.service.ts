import { VariableValue, generateOutput } from "@bitmetro/phrase-gen";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PhrasesService {
  generatePhrases(inputs: string[], variables: VariableValue[]): string[] {
    return generateOutput(inputs, variables);
  }
}
