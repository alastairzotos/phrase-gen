import React from 'react';
import { usePhraseGenState } from '../state/phrase-gen';
import { Column } from './column';
import { CustomTextArea } from './textarea/textarea';

export const Inputs: React.FC = () => {
  const phrases = usePhraseGenState(state => state.phrases);
  const setPhrases = usePhraseGenState(state => state.setPhrases);

  return (
    <Column title="Inputs">
      <div style={{ height: 'calc(100vh - 120px)' }}>
        <CustomTextArea
          value={phrases.join('\n')}
          onChange={content => setPhrases(content.split('\n'))}
        />
      </div>
    </Column>
  )
}
