import { ProjectData } from "@bitmetro/phrase-gen-dtos";
import { Body, Controller, Get, Param, Post, UseGuards, NotFoundException } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles.decorator";
import { User } from "src/schemas/user.schema";
import { Principal } from "src/users/principal.decorator";
import { ProjectsService } from "./projects.service";

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(
    @Principal() user: User
  ) {
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
  async save(
    @Principal() user: User,
    @Body() data: ProjectData
  ) {
    return await this.projectsService.saveProject(user, data);
  }
}
