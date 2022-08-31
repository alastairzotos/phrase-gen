import React from 'react';
import { Row, Col } from 'antd';
import { Inputs } from './inputs';
import { Variables } from './variables';
import { Output } from './output';
import { AppTemplate } from './app-template';

export const PhraseGen: React.FC = () => {
  return (
    <AppTemplate>
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
    </AppTemplate>
  );
};
