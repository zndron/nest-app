import { Project } from 'src/projects/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, Generated, JoinColumn, ManyToOne } from 'typeorm';

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

  @Column({
    nullable: true,
  })
  project_id: string;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}