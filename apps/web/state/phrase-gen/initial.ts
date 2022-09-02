import { PhraseGenInputs } from "./state";

export const initialState: PhraseGenInputs = {
  phrases: ['buy @item in @city', '@item for sale in @city'],
  variables: [
    { name: 'item', values: ['flowers', 'chairs'] },
    { name: 'city', values: ['london', 'paris'] },
  ],
};
