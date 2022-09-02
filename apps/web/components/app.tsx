import React from 'react';
import { Row, Col, Spin, Typography } from 'antd';
import { Inputs } from './inputs';
import { Variables } from './variables';
import { Output } from './output';
import { AppTemplate } from './app-template';
import { useProjectsState } from '../state/projects';

import styles from './app.module.css';
import Link from 'next/link';
import { urls } from '../urls';

const { Title, Link: LinkText } = Typography;

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
          <div className={styles.overlay}>
            <Spin size='large' />
          </div>
        )}

        {loadStatus === 'failure' && (
          <div className={styles.overlay}>
            <Title>Project not found</Title>
            <Title level={4}>It must've been deleted</Title>
            <Link href={urls.home()}>
              <LinkText>Return home</LinkText>
            </Link>
          </div>
        )}
      </div>
    </AppTemplate>
  );
};
