import { ProjectData, ProjectListItem } from "@bitmetro/phrase-gen-dtos";
import { HttpService } from "./http.service";

export interface IProjectsService {
  saveProject: (data: Partial<ProjectData>) => Promise<string>;
  loadProject: (id: string) => Promise<ProjectData>;
  loadProjects: () => Promise<ProjectListItem[]>;
}

export class ProjectsService extends HttpService implements IProjectsService {
  async saveProject(projectData: Partial<ProjectData>): Promise<string> {
    const { data } = await this.httpClient.post<ProjectData, { data: string }>('/projects/save', projectData);

    return data;
  }

  async loadProject(id: string): Promise<ProjectData> {
    const { data } = await this.httpClient.get<ProjectData>(`/projects/${id}`);

    return data;
  }

  async loadProjects(): Promise<ProjectListItem[]> {
    const { data } = await this.httpClient.get<ProjectListItem[]>('/projects');

    return data;
  }
}
