import React from 'react';
import { Row, Col, Spin } from 'antd';
import { Inputs } from './inputs';
import { Variables } from './variables';
import { Output } from './output';
import { AppTemplate } from './app-template';
import { useProjectsState } from '../state/projects';
import { useRouter } from 'next/router';

import styles from './app.module.css';

export const PhraseGen: React.FC = () => {
  const { pathname } = useRouter();

  const loadStatus = useProjectsState(s => s.loadStatus);

  return (
    <AppTemplate>
      {loadStatus === 'fetching' && (
        <div className={styles.spin}>
          <Spin size='large' />
        </div>
      )}

      {(loadStatus === 'success' || pathname === '/') && (
        <Row style={{ height: '100%' }}>
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
      )}
    </AppTemplate>
  );
};
