import { ProjectData } from "@bitmetro/phrase-gen-dtos";
import { Injectable } from "@nestjs/common";
import { User } from "src/schemas/user.schema";
import { ProjectsRepository } from "./projects.repository";

@Injectable()
export class ProjectsService {
  constructor(private readonly projectsRepository: ProjectsRepository) {}

  async getProject(id: string) {
    return await this.projectsRepository.getProject(id);
  }

  async getProjects(user: User) {
    return await this.projectsRepository.getProjects(user);
  }

  async saveProject(user: User, project: ProjectData) {
    return await this.projectsRepository.saveProject(user, project);
  }
}
