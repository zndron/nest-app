import { Task } from 'src/tasks/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}