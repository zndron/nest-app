import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { Project } from './projects/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '[password]',
      database: 'c1nodejs',
      entities: [Task, Project],
      //autoLoadEntities: true, // only on development mode
      synchronize: true,
    }),
    TasksModule,
    UsersModule,
    ProjectsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
