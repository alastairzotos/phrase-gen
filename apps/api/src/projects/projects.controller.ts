import { ProjectData } from "@bitmetro/phrase-gen-dtos";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/auth/roles.decorator";
import { User } from "src/schemas/user.schema";
import { Principal } from "src/users/principal.decorator";
import { ProjectsService } from "./projects.service";

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':id')
  @Roles('all')
  async getProject(@Param('id') id: string) {
    return await this.projectsService.getProject(id);
  }

  @Post('save')
  async save(
    @Principal() user: User,
    @Body() data: ProjectData
  ) {
    return await this.projectsService.saveProject(user, data);
  }
}
