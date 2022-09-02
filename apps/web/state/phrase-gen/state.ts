import create from 'zustand';
import { generateOutput, VariableValue, PhraseGenResult } from '@bitmetro/phrase-gen';
import { useProjectsState } from '../projects';

export interface PhraseGenInputs {
  phrases: string[];
  variables: VariableValue[];
}

interface PhraseGenData extends PhraseGenInputs {
  output: PhraseGenResult;
}

interface PhraseGenActions {
  setPhrases: (phrases: string[]) => void;
  addVariable: (name: string) => void;
  renameVariable: (name: string, newName: string) => void;
  setVariableValues: (name: string, values: string[]) => void;
  deleteVariable: (name: string) => void;
  setPhrasesAndVariables: (phrases: string[], variables: VariableValue[]) => void;
}

type PhraseGenState = PhraseGenData & PhraseGenActions;

const generate = (state: PhraseGenInputs) => generateOutput(state.phrases, state.variables);

export const usePhraseGenState = create<PhraseGenState>((set, get) => ({
  phrases: [],
  variables: [],
  output: generate({ phrases: [], variables: [] }),

  setPhrases: phrases => {
    set({ phrases: phrases.map(phrase => phrase.trimStart()) });
    set({ output: generate(get()) });

    useProjectsState.getState().setDirty(true);
  },

  addVariable: name => {
    set({
      variables: [
        ...get().variables,
        { name, values: [] }
      ]
    });

    set({ output: generate(get()) });

    useProjectsState.getState().setDirty(true);
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

    useProjectsState.getState().setDirty(true);
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

    useProjectsState.getState().setDirty(true);
  },

  deleteVariable: name => {
    set({
      variables:
        get().variables
        .filter(variable => variable.name !== name)
    });

    set({ output: generate(get()) });

    useProjectsState.getState().setDirty(true);
  },

  setPhrasesAndVariables: (phrases, variables) => set({ phrases, variables, output: generate({ phrases, variables }) }),
}));
