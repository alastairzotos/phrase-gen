import create from 'zustand';
import router from 'next/router'

import { FetchStatus } from '../../models';
import { IProjectsService, ProjectsService } from "../../services/projects.service";
import { usePhraseGenState } from '../phrase-gen';
import { ProjectData } from '@bitmetro/phrase-gen-dtos';

export interface ProjectsValues {
  _id?: string;
  name: string;
  saveStatus?: FetchStatus;
  loadStatus?: FetchStatus;
  dirty: boolean;
}

export interface ProjectsActions {
  setDirty: (dirty: boolean) => void;
  setName: (name: string) => void;
  saveProject: () => Promise<void>;
  loadProject: (id: string) => void;
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

        const { phrases: inputs, variables } = usePhraseGenState.getState();

        const _id = await projectsService.saveProject({
          _id: get()._id,
          name: get().name,
          inputs,
          variables
        })

        set({ saveStatus: 'success', dirty: false, _id });

        router.push(`/project/${_id}`);
      } catch {
        set({ saveStatus: 'failure' });
      }
    },

    loadProject: async id => {
      try {
        set({ loadStatus: 'fetching' });

        const { _id, name, inputs, variables } = await projectsService.loadProject(id);

        set({ loadStatus: 'success', _id, name });

        usePhraseGenState.getState().setPhrasesAndVariables(inputs, variables);
      } catch {
        set({ loadStatus: 'failure' });
      }
    }
  }));

const initialValues: ProjectsValues = {
  name: '',
  dirty: false,
}

export const useProjectsState = createProjectsState(initialValues, new ProjectsService());
