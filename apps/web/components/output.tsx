import { Button, Space, Popover } from 'antd';
import React, { useState } from 'react';
import { usePhraseGenState } from '../state/phrase-gen';
import { Column } from './column';
import { MatchTypeSelector } from './match-type-selector';
import { Textarea } from './textarea';

export const Output: React.FC = () => {
  const output = usePhraseGenState(state => state.output);
  const [hover, setHover] = useState(false);
  const [copiedPopupVisible, setCopiedPopupVisible] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(output.results?.join('\n')!);

    setTimeout(() => setCopiedPopupVisible(false), 1500);
  }

  return (
    <Column
      title={
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Space size={6}>
            Output

            {hover && (
              <Popover
                content='Copied to clipboard'
                trigger='click'
                visible={copiedPopupVisible}
                onVisibleChange={visible => setCopiedPopupVisible(visible)}
              >
                <Button
                  size='small'
                  type='dashed'
                  onClick={handleCopyClick}
                >
                  Copy
                </Button>
              </Popover>
            )}
          </Space>
        </div>
      }
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
          color: '#555',
          fontFamily: 'lucida console, monospace'
        }}
      />
    </Column>
  );
};
