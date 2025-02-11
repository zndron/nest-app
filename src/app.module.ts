import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { typeOrmModuleAsyncOptions } from './database/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    TasksModule,
    UsersModule,
    ProjectsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
