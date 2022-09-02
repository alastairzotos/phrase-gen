import React from 'react';
import { Row, Col, Spin } from 'antd';
import { Inputs } from './inputs';
import { Variables } from './variables';
import { Output } from './output';
import { AppTemplate } from './app-template';
import { useProjectsState } from '../state/projects';

import styles from './app.module.css';

export const PhraseGen: React.FC = () => {
  const loadStatus = useProjectsState(s => s.loadStatus);

  return (
    <AppTemplate>
      <div className={styles.wrapper}>
        <Row className={styles.row}>
          <Col span={5}>
            <Inputs />
          </Col>

          <Col span={13}>
            <Variables />
          </Col>

          <Col span={6}>
            <Output />
          </Col>
        </Row>

        {loadStatus === 'fetching' && (
          <div className={styles.spin}>
            <Spin size='large' />
          </div>
        )}
      </div>
    </AppTemplate>
  );
};
