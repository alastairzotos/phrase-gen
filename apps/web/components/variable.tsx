import React, { useState } from 'react';
import { Card, Typography, Space, Tooltip, Modal } from 'antd';
import { CloseOutlined, WarningFilled } from '@ant-design/icons';
import { usePhraseGenState } from '../state';
import { Textarea } from './textarea';
import styles from './variable.module.css';
import { VariableValue } from '@bitmetro/phrase-gen';

interface Props {
  variable: VariableValue;
}

const errors = {
  'no-content': 'Variable name cannot be empty',
  'already-exists': 'Variable with this name already exists'
}

type ErrorType = keyof typeof errors | null;

const { Text } = Typography;

export const Variable: React.FC<Props> = ({ variable }) => {
  const variables = usePhraseGenState(state => state.variables);
  const renameVariable = usePhraseGenState(state => state.renameVariable);
  const setVariableValues = usePhraseGenState(state => state.setVariableValues);
  const deleteVariable = usePhraseGenState(state => state.deleteVariable);

  const [name, setName] = useState(variable.name);
  const [hovered, setHovered] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const validateName = (value: string) => {
    const isEmpty = value.length === 0;
    const alreadyExists = value !== variable.name && !!variables.find(variable => variable.name === value);

    if (isEmpty) {
      setError('no-content')
    } else if (alreadyExists) {
      setError('already-exists');
    } else {
      setError(null);
    }

    return !isEmpty && !alreadyExists;
  }

  const handleNameInput = (value: string) => {
    if (validateName(value) && value !== variable.name) {
      renameVariable(variable.name, value);
    }
    setName(value);
  }

  const handleValuesChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setVariableValues(variable.name, e.target.value.split('\n'));

  const handleDelete = () => {
    setDeleteModalOpen(false);
    deleteVariable(variable.name);
  }

  return (
    <div>
      <Card
        size="small"
        title={
          <Text
            editable={{
              onChange: handleNameInput,
            }}
          >
            {name}
          </Text>
        }
        className={styles.variable}
        bodyStyle={{ padding: 4 }}
        extra={
          <Space>
            {!!error && (
              <Tooltip title={errors[error]} placement="bottom">
                <WarningFilled />
              </Tooltip>
            )}

            {hovered && (
              <a onClick={() => setDeleteModalOpen(true)}>
                <CloseOutlined />
              </a>
            )}
          </Space>
        }
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Textarea
          rows={5}
          value={variable.values.join('\n')}
          onChange={handleValuesChange}
        />
      </Card>

      <Modal
        visible={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onOk={handleDelete}
      >
        <Text>{`Are you sure you wish to delete '${variable.name}'?`}</Text>
      </Modal>
    </div>
  )
}