import React from 'react';
import { Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { usePhraseGenState } from '../state/phrase-gen';
import { Variable } from './variable';
import { Column } from './column';

export const Variables: React.FC = () => {
  const variables = usePhraseGenState(state => state.variables);
  const addVariable = usePhraseGenState(state => state.addVariable);

  const handleAddVariable = () => {
    addVariable(`variable-${variables.length + 1}`);
  };

  return (
    <Column
      title="Variables"
      bodyStyle={{ backgroundColor: '#eee' }}
      extra={
        <Button size="small" type="primary" onClick={handleAddVariable}>
          <PlusOutlined /> Variable
        </Button>
      }
    >
      <Row>
        {
          variables.map(variable => (
            <Col span={6} key={variable.name}>
              <Variable variable={variable} />
            </Col>
          ))
        }
      </Row>
    </Column>
  )
};
