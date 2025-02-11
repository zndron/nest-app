import { Project } from '../projects/project.entity';
import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Generated, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

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
  title: string

  @Column('text')
  description: string

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @OneToOne(() => User)
  @JoinColumn({ name: "assigned_user" })
  user: User;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn()
  project: Project;
}