import {
    Controller,
    Get,
    Put,
    Delete,
    Post,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Body,
    Inject,
    Scope,
    Query,
    DefaultValuePipe,
  } from '@nestjs/common';
  import { DeleteResult, UpdateResult } from 'typeorm';
  import { Pagination } from 'nestjs-typeorm-paginate';
  import { ProjectsService } from './projects.service';
  import { Project } from './project.entity';
  import { CreateProjectDto } from './dto/project.dto';
  import { UpdateProjectDto } from './dto/project.dto';

@Controller('projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}

    @Post()
    create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
      return this.projectService.create(createProjectDto);
    }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.projectService.findOne({
      relations: {
        tasks: true
      },
      where: { id },
    });
  }
}
