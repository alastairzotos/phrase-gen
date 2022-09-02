import create from 'zustand';
import { generateOutput, VariableValue, PhraseGenResult, MatchType } from '@bitmetro/phrase-gen';
import { ProjectsState, useProjectsState } from '../projects';

export interface PhraseGenInputs {
  phrases: string[];
  variables: VariableValue[];
  matchType: MatchType;
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
  setVariables: (variables: VariableValue[]) => void;
  setMatchType: (matchType: MatchType) => void;
  setValues: (phrases: string[], variables: VariableValue[], matchType: MatchType) => void;
}

export type PhraseGenState = PhraseGenData & PhraseGenActions;

const generate = ({ phrases, variables, matchType }: PhraseGenInputs) => generateOutput(phrases, variables, matchType);

export const createPhraseGenState = (initialState: PhraseGenInputs) =>
  create<PhraseGenState>((set, get) => ({
    ...initialState,
    output: generate(initialState),

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

    setVariables: variables => {
      set({ variables, output: generate(get()) });
      useProjectsState.getState().setDirty(true);
    },

    setMatchType: matchType => {
      set({ matchType, output: generate({ ...get(), matchType }) });
      useProjectsState.getState().setDirty(true);
    },

    setValues: (phrases, variables, matchType) => set({ phrases, variables, matchType, output: generate({ phrases, variables, matchType }) }),
  }));

export const usePhraseGenState = createPhraseGenState({
  matchType: 'broad-match',
  phrases: [],
  variables: [],
});
