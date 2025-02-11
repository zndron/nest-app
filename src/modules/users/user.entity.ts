import { Project } from '../projects/project.entity';
import { Task } from '../tasks/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToMany(() => Project, (project) => project.users)
    projects: Project[];
}