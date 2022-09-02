import { Spin, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuthState } from '../state/auth';
import { useProjectsState } from '../state/projects';
import { urls } from '../urls';

import styles from './project-list.module.css';

const { Option } = Select;

export const ProjectList: React.FC = () => {
  const { push } = useRouter();

  const [loadProjectsStatus, loadProjects, projects, _id] = useProjectsState(s => [s.loadProjectsStatus, s.loadProjects, s.projects, s._id]);
  const accessToken = useAuthState(s => s.accessToken);

  useEffect(() => {
    if (!!accessToken) {
      loadProjects();
    }
  }, [accessToken]);

  const handleSelectProject = (id: string) => push(urls.project(id));

  return (
    <div className={styles.list}>
      {loadProjectsStatus === 'fetching' && <Spin size='small'/>}
      {loadProjectsStatus === 'success' && (
        <Select defaultValue={_id} onChange={handleSelectProject} placeholder='No projects'>
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
