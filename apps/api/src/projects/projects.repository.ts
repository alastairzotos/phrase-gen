import { ProjectData } from "@bitmetro/phrase-gen-dtos";
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

  async saveProject(user: User, project: ProjectData): Promise<string> {
    const found = project._id ? await this.projectsModel.findById(project._id) : undefined;

    if (found) {
      await this.projectsModel.updateOne({ user, ...project });
      return project._id;
    }

    const created = await this.projectsModel.create({ user, ...project });
    return created._id;
  }
}
