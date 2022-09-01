const variableSymbol = '@';

export interface VariableValue {
  name: string;
  values: string[];
}

export interface GeneratorErrors {
  errorType: 'circular_reference',
  message: string;
  circularReferences?: VariableValue[];
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

const generateOutputInner = (phrases: string[], variables: VariableValue[]): string[] => {
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

const checkCircularReference = (variables: VariableValue[], current: VariableValue, path: VariableValue[] = []): VariableValue[] => {
  path.push(current);

  for (let line of current.values) {
    const words = line.split(' ');
    const referencedVariables = words
      .filter(word => word.startsWith(variableSymbol))
      .map(variableName => variableName.substring(1))
      .map(variableName => variables.find(v => v.name === variableName))
      .filter(v => !!v);

    if (referencedVariables.find(refd => path.find(item => item.name === refd.name))) {
      return path;
    }

    for (let refd of referencedVariables) {
      const found = checkCircularReference(variables, refd, [...path, refd]);
      if (found) {
        return found;
      }
    }
  }

  return [];
}

const findCircularReferences = (variables: VariableValue[]): VariableValue[] => {
  for (let variable of variables) {
    const found = checkCircularReference(variables, variable);
    if (found.length) {
      return Object.values(found.reduce<{ [key: string]: VariableValue }>((acc, cur) => ({ ...acc, [cur.name]: cur }), {}));  // Get unique
    }
  }

  return [];
}

export const generateOutput = (phrases: string[], variables: VariableValue[]): PhraseGenResult => {
  const circularReferences = findCircularReferences(variables);
  if (circularReferences.length > 0) {
    return {
      success: false,
      errors: {
        errorType: 'circular_reference',
        message: `Circular reference in ${circularReferences.map(ref => `'${ref.name}'`).join(', ')}`,
        circularReferences
      }
    }
  }

  return {
    success: true,
    results: generateOutputInner(phrases, variables)
  }
}
