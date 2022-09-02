import React from 'react';
import Editor from 'react-simple-code-editor';

import styles from './textarea.module.css';

interface Props {
  value: string;
  onChange: (content: string) => void;
}

const highlightLine = (line: string) =>
  line
    .split(' ')
    .map((word, index) => (
      <React.Fragment key={index}>
        {
          word.startsWith('@')
            ? <span className={styles.variable}>{word}</span>
            : word
        }
        {' '}
      </React.Fragment>
    ))

const handleHighlight = (code: string) =>
  code
    .split('\n')
    .map((line, index) => <React.Fragment key={index}>{highlightLine(line)} <br /></React.Fragment>)


export const CustomTextArea: React.FC<Props> = ({ value: content, onChange }) => {
  return (
    <Editor
      style={{ fontFamily: 'lucida console, monospace' }}
      value={content}
      onValueChange={content => onChange(content)}
      highlight={handleHighlight}
    />
  )
};
