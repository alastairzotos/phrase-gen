import { Button, Input } from 'antd';
import React from 'react';
import { useProjectData } from '../hooks/use-project-data';
import { useProjectsState } from '../state/projects';

export const SaveForm: React.FC = () => {
  const [
    loadStatus,
    saveStatus,
    saveProject,
    name,
    setName,
    dirty
  ] = useProjectsState(s => [s.loadStatus, s.saveStatus, s.saveProject, s.name, s.setName, s.dirty]);

  const { userCanSaveProject } = useProjectData();

  if (loadStatus === 'failure') {
    return null;
  }

  if (!userCanSaveProject) {
    return null;
  }

  return (
    <>
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
    </>
  )
}
