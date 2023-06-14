import { Spin, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useProjectData } from '../hooks/use-project-data';
import { useProjectsState } from '../state/projects';
import { urls } from '../urls';

import styles from './project-list.module.css';
import { useLoggedInUser } from '@bitmetro/auth-react';

const { Option } = Select;

export const ProjectList: React.FC = () => {
  const { push } = useRouter();

  const [loadProjectsStatus, loadProjects, projects, _id, name] = useProjectsState(s => [s.loadProjectsStatus, s.loadProjects, s.projects, s._id, s.name]);
  const loggedInUser = useLoggedInUser();
  const { userCanSaveProject } = useProjectData();

  useEffect(() => {
    if (!!loggedInUser) {
      loadProjects();
    }
  }, [loggedInUser]);

  const handleSelectProject = (id: string) => push(urls.project(id));

  return (
    <div className={styles.list}>
      {loadProjectsStatus === 'fetching' && <Spin size='small'/>}
      {loadProjectsStatus === 'success' && (
        <Select defaultValue={userCanSaveProject ? _id : name} onChange={handleSelectProject} placeholder="Select project">
        {
          projects.map(project => (
            <Option
              key={project._id}
              value={project._id}
            >
              {project.name}
            </Option>
          ))
        }
        </Select>
      )}
    </div>
  )
}
