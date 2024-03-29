import { ProjectData } from '@bitmetro/phrase-gen-dtos';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Principal } from 'src/auth/principal.decorator';
import { ProjectsService } from './projects.service';
import { IIdentity, WithId } from '@bitmetro/auth-node';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(@Principal() user: WithId<IIdentity>) {
    return await this.projectsService.getProjects(user);
  }

  @Get(':id')
  @Roles('all')
  async getProject(@Param('id') id: string) {
    const project = await this.projectsService.getProject(id);

    if (!project) {
      throw new NotFoundException(`Cannot find project: ${id}`);
    }

    return project;
  }

  @Post('save')
  async save(@Principal() user: WithId<IIdentity>, @Body() data: ProjectData) {
    const result = await this.projectsService.saveProject(user, data);

    if (result.error === 'unauthorised') {
      throw new ForbiddenException();
    }

    return result!.id;
  }
}
