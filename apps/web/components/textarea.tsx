import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

interface Props {
  disabled?: boolean;
  rows?: number,
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export const Textarea: React.FC<Props> = ({
  disabled = false,
  rows = 0,
  value,
  onChange = () => { },
  style,
}) => (
  <TextArea
    rows={rows}
    disabled={disabled}
    onChange={onChange}
    style={{
      height: '100%',
      border: 'none',
      ...style
    }}
    value={value}
  />
)
