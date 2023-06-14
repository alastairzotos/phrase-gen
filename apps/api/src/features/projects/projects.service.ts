import { ProjectData } from '@bitmetro/phrase-gen-dtos';
import { Injectable } from '@nestjs/common';
import { ProjectsRepository } from './projects.repository';
import { IIdentity, WithId } from '@bitmetro/auth-node';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async getProject(id: string) {
    return await this.projectsRepository.getProject(id);
  }

  async getProjects(user: WithId<IIdentity>) {
    return await this.projectsRepository.getProjects(user._id);
  }

  async saveProject(user: WithId<IIdentity>, project: ProjectData) {
    return await this.projectsRepository.saveProject(user._id, project);
  }
}
