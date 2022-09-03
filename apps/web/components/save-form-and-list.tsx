import { Button, Input } from 'antd';
import React from 'react';
import { useProjectsState } from '../state/projects';
import { getUserDetails } from '../utils/user';
import { ProjectList } from './project-list';

export const SaveFormAndList: React.FC = () => {
  const [
    loadStatus,
    saveStatus,
    saveProject,
    name,
    setName,
    dirty,
    projectOwner
  ] = useProjectsState(s => [s.loadStatus, s.saveStatus, s.saveProject, s.name, s.setName, s.dirty, s.projectOwner]);

  if (loadStatus === 'failure') {
    return null;
  }

  const loggedInUser = getUserDetails();

  if (!!loggedInUser && loggedInUser._id !== projectOwner?._id) {
    return null;
  }

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

      <ProjectList />
    </div>
  )
}
