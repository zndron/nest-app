import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

export enum TaskStatus {
  TODO = 'todo',
  INPROGRESS = 'in-progress',
  DONE = 'done'
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
    @Generated('uuid')
    uuid: string

  @Column()
  title: string

  @Column('text')
  description: string

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus
}