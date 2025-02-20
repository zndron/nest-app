import { Module } from '@nestjs/common';
import { typeOrmModuleAsyncOptions } from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
       TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    ],
    controllers: [],
    providers: [],
  })
export class DatabaseModule {}
