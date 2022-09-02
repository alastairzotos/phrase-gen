import React from 'react';
import { usePhraseGenState } from '../state/phrase-gen';
import { Column } from './column';
import { Textarea } from './textarea';

export const Inputs: React.FC = () => {
  const phrases = usePhraseGenState(state => state.phrases);
  const setPhrases = usePhraseGenState(state => state.setPhrases);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setPhrases(e.target.value.split('\n'));

  return (
    <Column title="Inputs">
      <Textarea
        value={phrases.join('\n')}
        onChange={handleChange}
      />
    </Column>
  )
}
