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
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}


  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.uuid = createTaskDto.uuid;
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = createTaskDto.status;

    return this.taskRepository.save(task);
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: number): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.taskRepository.delete(id);
  }

  update(id: number, recordToUpdate: UpdateTaskDto): Promise<UpdateResult> {
    return this.taskRepository.update(id, recordToUpdate);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Task>> {
    const queryBuilder = this.taskRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.id', 'DESC');

    return paginate<Task>(queryBuilder, options);
  }

  // getAllTask(): Task[] {
  //   return this.task;
  // }

  // getTaskById(id: number): Task {
  //   return this.task.find((task) => task.id === id);
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

  //   this.task.push(task);
  //   return task;
  // }

  // updateTask(id: number, updateTaskDto: UpdateTaskDto): Task {
  //   const task = this.getTaskById(id);
  //   Object.assign(task, updateTaskDto);
  //   return task;
  // }

  // deleteTask(id: number): void {
  //   this.task = this.task.filter((task) => task.id !== id);
  // }
}
