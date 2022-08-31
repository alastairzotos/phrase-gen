
import React from 'react';
import { Card } from 'antd';
import styles from './column.module.css';

interface Props {
  title: string;
  bodyStyle?: React.CSSProperties;
  extra?: React.ReactNode;
}

export const Column: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  bodyStyle,
  extra,
  children,
}) => (
  <Card
    title={title}
    className={styles.column}
    bodyStyle={{ height: '100%', padding: 0, ...(bodyStyle || {}) }}
    extra={extra}
  >
    {children}
  </Card>
)
