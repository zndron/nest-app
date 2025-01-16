import { Injectable } from '@nestjs/common';
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
    private tasksRepository: Repository<Task>,
  ) {}


  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.uuid = createTaskDto.uuid;
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = createTaskDto.status;

    return this.tasksRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.tasksRepository.delete(id);
  }

  update(id: number, recordToUpdate: UpdateTaskDto): Promise<UpdateResult> {
    return this.tasksRepository.update(id, recordToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Task>> {
    const queryBuilder = this.tasksRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.id', 'DESC');

    return paginate<Task>(queryBuilder, options);
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskById(id: number): Task {
  //   return this.tasks.find((task) => task.id === id);
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id,
  //     uuid: uuidv4(),
  //     title,
  //     description,
  //     status,,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // updateTask(id: number, updateTaskDto: UpdateTaskDto): Task {
  //   const task = this.getTaskById(id);
  //   Object.assign(task, updateTaskDto);
  //   return task;
  // }

  // deleteTask(id: number): void {
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
}
