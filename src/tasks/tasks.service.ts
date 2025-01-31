import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.preload({
      id: +id,
      ...updateTaskDto
    });
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`)
    }
    return this.taskRepository.save(task);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Task>> {
    const queryBuilder = this.taskRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.id', 'DESC');

    return paginate<Task>(queryBuilder, options);
  }

}
