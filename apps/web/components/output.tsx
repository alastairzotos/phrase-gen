import React from 'react';
import { usePhraseGenState } from '../state/phrase-gen';
import { Column } from './column';
import { MatchTypeSelector } from './match-type-selector';
import { Textarea } from './textarea';

export const Output: React.FC = () => {
  const output = usePhraseGenState(state => state.output);

  return (
    <Column
      title="Output"
      extra={<MatchTypeSelector />}
    >
      <Textarea
        disabled
        value={
          output.success
          ? output.results!.join('\n')
          : output.errors?.message!
        }
        style={{
          overflowY: 'scroll',
          maxHeight: '100%',
          color: '#555'
        }}
      />
    </Column>
  );
};
