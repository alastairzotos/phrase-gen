import create from 'zustand';
import { generateOutput, VariableValue } from '@bitmetro/phrase-gen';
import { initialState } from './initial';

export interface PhraseGenInputs {
  phrases: string[];
  variables: VariableValue[];
}

interface PhraseGenData extends PhraseGenInputs {
  output: string[];
}

interface PhraseGenActions {
  setPhrases: (phrases: string[]) => void;
  addVariable: (name: string) => void;
  renameVariable: (name: string, newName: string) => void;
  setVariableValues: (name: string, values: string[]) => void;
  deleteVariable: (name: string) => void;
}

type PhraseGenState = PhraseGenData & PhraseGenActions;

const generate = (state: PhraseGenInputs) => generateOutput(state.phrases, state.variables);

export const usePhraseGenState = create<PhraseGenState>((set, get) => ({
  ...initialState,
  output: generate(initialState),

  setPhrases: phrases => {
    set({ phrases: phrases.map(phrase => phrase.trimStart()) });
    set({ output: generate(get()) });
  },

  addVariable: name => {
    set({
      variables: [
        ...get().variables,
        { name, values: [] }
      ]
    });

    set({ output: generate(get()) });
  },

  renameVariable: (name, newName) => {
    set({
      variables: 
        get().variables
        .map(variable => (
          variable.name === name
          ? { ...variable, name: newName }
          : variable
        ))
    });

    set({ output: generate(get()) });
  },

  setVariableValues: (name, values) => {
    set({
      variables:
        get().variables
        .map(variable => (
          variable.name === name
          ? { ...variable, values }
          : variable
        ))
    });

    set({ output: generate(get()) });
  },

  deleteVariable: name => {
    set({
      variables:
        get().variables
        .filter(variable => variable.name !== name)
    });

    set({ output: generate(get()) });
  }
}));
