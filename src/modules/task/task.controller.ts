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
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
    limit = 10,
  ): Promise<Pagination<Task>> {
    limit = limit > 100 ? 100 : limit;
    return this.taskService.paginate({
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateResult> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.taskService.remove(id);
  }

  // @Get()
  // getAllTask(): Task[] {
  //   return this.taskService.getAllTask();
  // }

  // @Get(':id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.taskService.getTaskById(id);
  // }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.taskService.createTask(createTaskDto);
  // }

  // @Patch(':id')
  // updateTask(
  //   @Param('id') id: number,
  //   @Body() updateTaskDto: UpdateTaskDto,
  // ): Task {
  //   return this.taskService.updateTask(id, updateTaskDto);
  // }

  // @Delete(':id')
  // deleteTask(@Param('id') id: string): void {
  //   this.taskService.deleteTask(id);
  // }
}
