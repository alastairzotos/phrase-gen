import React from 'react';
import { VariableValue } from '@bitmetro/phrase-gen';
import Editor from 'react-simple-code-editor';

import { usePhraseGenState } from '../../state/phrase-gen';

import styles from './textarea.module.css';

interface Props {
  value: string;
  onChange: (content: string) => void;
}

const highlightLine = (line: string, variables: VariableValue[]) =>
  line
    .split(' ')
    .map((word, index) => (
      <React.Fragment key={index}>
        {
          word.startsWith('@')
            ? (
              variables.find(v => '@' + v.name === word)
                ? <span className={styles.variable}>{word}</span>
                : <span className={styles.variableerror}>{word}</span>
            )
            : word
        }
        {' '}
      </React.Fragment>
    ))

const handleHighlight = (code: string, variables: VariableValue[]) =>
  code
    .split('\n')
    .map((line, index) => <React.Fragment key={index}>{highlightLine(line, variables)} <br /></React.Fragment>)


export const CustomTextArea: React.FC<Props> = ({ value: content, onChange }) => {
  const variables = usePhraseGenState(s => s.variables);

  return (
    <div className={styles.wrapper}>
      <Editor
        style={{ fontFamily: 'lucida console, monospace' }}
        textareaClassName={styles.textarea}
        value={content}
        onValueChange={content => onChange(content)}
        highlight={code => handleHighlight(code, variables)}
      />
    </div>
  )
};
