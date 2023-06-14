import { MatchType } from '@bitmetro/phrase-gen';
import { Select } from 'antd';
import React from 'react';
import { usePhraseGenState } from '../state/phrase-gen';

const { Option } = Select;

export const MatchTypeSelector: React.FC = () => {
  const [matchType, setMatchType] = usePhraseGenState(s => [s.matchType, s.setMatchType]);

  return (
    <Select<MatchType> defaultValue={'broad-match'} value={matchType} onChange={setMatchType}>
      <Option value='broad-match'>Broad match</Option>
      <Option value='phrase-match'>Phrase match</Option>
      <Option value='exact-match'>Exact match</Option>
    </Select>
  )
}
