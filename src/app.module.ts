import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './modules/task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './modules/task/task.entity';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TaskController } from './modules/task/task.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '[password]',
      database: 'c1nodejs',
      entities: [Task],
      synchronize: true,
    }),
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2

    consumer.apply(LoggerMiddleware).forRoutes(TaskController); //option no 3
  }
}
