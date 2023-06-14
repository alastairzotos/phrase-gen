export type TokenType = 'text' | 'variable';

export interface Token {
  type: TokenType;
  position: number;
  token: string;
}

export const tokenize = (line: string): Token[] => {
  const tokens: Token[] = [];
  let tokenType: TokenType | null = null;
  let token = '';

  let i = 0;
  for (; i < line.length; i++) {
    const char = line[i];

    switch (tokenType as TokenType | null) {
      case null: {
        if (char === '@') {
          tokenType = 'variable';
        } else {
          tokenType = 'text';
        }

        break;
      }

      case 'text': {
        if (char === '@') {
          tokens.push({ type: 'text', token, position: i });
          token = '';
          tokenType = 'variable';
        }

        break;
      }

      case 'variable': {
        if (isSpace(char)) {
          tokens.push({ type: 'variable', token, position: i });
          token = '';
          tokenType = null;
        }

        break;
      }
    }

    token += char;
  }

  tokens.push({ type: tokenType!, token, position: i });

  return tokens;
}

const isSpace = (char: string) => char === ' ' || char === '\t';
