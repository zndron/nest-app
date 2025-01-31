import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { Project } from './project.entity';
import { CreateProjectDto } from './dto/project.dto';
import { UpdateProjectDto } from './dto/project.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) {}

create(createProjectDto: CreateProjectDto): Promise<Project> {
    const task = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(task);
}
}
