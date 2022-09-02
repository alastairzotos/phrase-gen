import { Button, Input } from 'antd';
import React from 'react';
import { useProjectsState } from '../state/projects';

export const SaveForm: React.FC = () => {
  const [saveStatus, saveProject, name, setName, dirty] = useProjectsState(s => [s.saveStatus, s.saveProject, s.name, s.setName, s.dirty]);

  return (
    <div style={{ display: 'flex' }}>
      <Input
        placeholder='Unnamed project'
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <Button
        disabled={saveStatus === 'fetching' || (!!name && name.trim() === '')}
        type='primary'
        onClick={saveProject}
      >
        Save{dirty && '*'}
      </Button>
    </div>
  )
}
