import React from 'react';
import { usePhraseGenState } from '../state';
import { Column } from './column';
import { Textarea } from './textarea';

export const Output: React.FC = () => {
  const output = usePhraseGenState(state => state.output);

  return (
    <Column title="Output">
      <Textarea
        disabled
        value={
          output.success
          ? output.results!.join('\n')
          : output.errors?.message!
        }
        style={{ overflowY: 'scroll', maxHeight: '100%' }}
      />
    </Column>
  );
};
