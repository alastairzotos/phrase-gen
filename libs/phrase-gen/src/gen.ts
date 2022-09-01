const variableSymbol = '@';

export interface VariableValue {
  name: string;
  values: string[];
}

export interface GeneratorErrors {
  errorType: 'circular_reference'
}

export interface PhraseGenResult {
  success: boolean;
  results?: string[];
  errors?: GeneratorErrors;
}

const generateLines = (parts: string[][]): string[] => {
  const indices: number[] = new Array(parts.length).fill(0);
  const lines: string[] = [];

  const increment = (position = 0): boolean => {
    if (position > indices.length - 1) {
      return false;
    }

    if (indices[position] < parts[position].length - 1) {
      indices[position]++;
      return true;
    } else {
      indices[position] = 0;
      return increment(position + 1);
    }
  };

  while (true) {
    lines.push(
      parts.map((part, index) => part[indices[index]]).join(' ')
    );

    if (!increment()) {
      break;
    }
  }

  return lines;
}

export const generateOutputInner = (phrases: string[], variables: VariableValue[]): string[] => {
  let outputs: string[] = [];

  for (const phrase of phrases) {
    const words = phrase.split(' ');

    const parts: string[][] = words.map(word => {
      if (word.startsWith(variableSymbol)) {
        const variable = variables.find(variable => variableSymbol + variable.name === word);

        if (variable) {
          return generateOutputInner(variable.values, variables);
        } else {
          return [`<Unknown variable '${word}'>`];
        }
      }

      return [word];
    })

    outputs.push(...generateLines(parts));
  }

  return outputs;
}

export const generateOutput = (phrases: string[], variables: VariableValue[]): PhraseGenResult => {
  // return phrases.reduce<string[]>((acc, phrase) => [...acc, ...generateOutputInner([phrase], variables)], []);
  return {
    success: true,
    results: generateOutputInner(phrases, variables)
  }
}
