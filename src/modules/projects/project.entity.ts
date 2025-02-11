import { Task } from '../tasks/task.entity';
import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany, ManyToMany } from 'typeorm';

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

  @ManyToMany(() => User, (user) => user.projects, { cascade: true })
  @JoinTable({ name: "projects_users" })
  users: User[];
}