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
        const project = this.projectRepository.create(createProjectDto);
        return this.projectRepository.save(project);
    }

    async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.preload({
        id: +id,
        ...updateProjectDto
    });
    if (!project) {
        throw new NotFoundException(`project #${id} not found`)
    }
    return this.projectRepository.save(project);
    }

    findAll() {
        return this.projectRepository.find({
            relations: ['tasks']
        });
    }

    async findOne(options): Promise<Project | null> {
        const project = await this.projectRepository.findOne(options);
        if (!project) {
            throw new NotFoundException(`Project not found`)
        }
        return project;
    }
}
