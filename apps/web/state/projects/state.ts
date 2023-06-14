import create from 'zustand';
import router from 'next/router'

import { FetchStatus } from '../../models';
import { IProjectsService, ProjectsService } from "../../services/projects.service";
import { usePhraseGenState } from '../phrase-gen';
import { ProjectListItem } from '@bitmetro/phrase-gen-dtos';
import { urls } from '../../urls';

export interface ProjectsValues {
  _id?: string;
  name: string;
  projectOwnerId?: string;
  saveStatus?: FetchStatus;
  loadStatus?: FetchStatus;
  dirty: boolean;
  loadProjectsStatus?: FetchStatus;
  projects: ProjectListItem[];
}

export interface ProjectsActions {
  setDirty: (dirty: boolean) => void;
  setName: (name: string) => void;
  saveProject: () => Promise<void>;
  loadProject: (id: string) => void;
  loadProjects: () => void;
  clear: () => void;
}

export type ProjectsState = ProjectsValues & ProjectsActions;

export const createProjectsState = (initialValues: ProjectsValues, projectsService: IProjectsService) =>
  create<ProjectsState>((set, get) => ({
    ...initialValues,

    setDirty: dirty => set({ dirty }),
    
    setName: name => set({ name, dirty: true }),

    saveProject: async () => {
      try {
        set({ saveStatus: 'fetching' });

        const { phrases: inputs, variables, matchType } = usePhraseGenState.getState();

        const _id = await projectsService.saveProject({
          _id: get()._id,
          name: get().name,
          inputs,
          variables,
          matchType
        })

        set({ saveStatus: 'success', dirty: false, _id });

        router.push(urls.project(_id));
      } catch {
        set({ saveStatus: 'failure' });
      }
    },

    loadProject: async id => {
      try {
        set({ loadStatus: 'fetching' });

        const { _id, name, inputs, variables, matchType, ownerId } = await projectsService.loadProject(id);

        set({ loadStatus: 'success', _id, name, projectOwnerId: ownerId });

        usePhraseGenState.getState().setValues(inputs, variables, matchType);
      } catch {
        set({ loadStatus: 'failure' });
      }
    },

    loadProjects: async () => {
      try {
        set({ loadProjectsStatus: 'fetching' });

        const projects = await projectsService.loadProjects();

        set({ loadProjectsStatus: 'success', projects });
      } catch {
        set({ loadProjectsStatus: 'failure' });
      }
    },

    clear: () => set({ _id: undefined, name: undefined, dirty: false, projects: [], loadStatus: undefined, loadProjectsStatus: undefined })
  }));

const initialValues: ProjectsValues = {
  name: '',
  dirty: false,
  projects: []
}

export const useProjectsState = createProjectsState(initialValues, new ProjectsService());
