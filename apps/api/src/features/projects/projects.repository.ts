import { ProjectData, ProjectListItem } from '@bitmetro/phrase-gen-dtos';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/schemas/project.schema';

export interface SaveProjectResult {
  id?: string;
  error?: 'unauthorised';
}

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectModel(Project.name) private readonly projectsModel: Model<Project>,
  ) {}

  async getProject(id: string) {
    return await this.projectsModel.findById(id);
  }

  async getProjects(ownerId: string): Promise<ProjectListItem[]> {
    return (await this.projectsModel.find({ ownerId })).map(
      ({ _id, name }) => ({ _id, name }),
    );
  }

  async saveProject(
    ownerId: string,
    project: ProjectData,
  ): Promise<SaveProjectResult> {
    const found = project._id
      ? await this.projectsModel.findById(project._id)
      : undefined;

    if (found) {
      if (ownerId !== found.ownerId) {
        return { error: 'unauthorised' };
      }

      await this.projectsModel.updateOne(
        { _id: project._id },
        { ...project, lastUpdated: Date.now() },
      );
      return { id: project._id };
    }

    const { _id } = await this.projectsModel.create({
      ownerId,
      ...project,
      lastUpdated: Date.now(),
    });

    return { id: _id };
  }
}
