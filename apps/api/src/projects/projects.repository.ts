import { ProjectData, ProjectListItem } from "@bitmetro/phrase-gen-dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Project } from "src/schemas/project.schema";
import { User } from "src/schemas/user.schema";

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel(Project.name) private readonly projectsModel: Model<Project>
  ) {}

  async getProject(id: string) {
    return await this.projectsModel.findById(id);
  }

  async getProjects(user: User): Promise<ProjectListItem[]> {
    return await (await this.projectsModel.find({ user })).map(({ _id, name }) => ({ _id, name }));
  }

  async saveProject(user: User, project: ProjectData): Promise<string> {
    const found = project._id ? await this.projectsModel.findById(project._id) : undefined;

    if (found) {
      await this.projectsModel.updateOne({ _id: project._id }, { ...project, lastUpdated: Date.now() });
      return project._id;
    }

    const { _id } = await this.projectsModel.create({ user, ...project, lastUpdated: Date.now() });
    return _id;
  }
}
