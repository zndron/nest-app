import { Project } from '../projects/project.entity';
import { Entity, Column, Index, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({
        type: 'varchar',
        length: 32,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 60,
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 32
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 32
    })
    lastName: string;

    @Index()
    @Column({ 
        type: 'boolean',
        default: true 
    })
    active: boolean;

    @ManyToMany(() => Project, (project) => project.users)
    projects: Project[];
}