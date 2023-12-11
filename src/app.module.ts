import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [],
  providers: [],
})
export class AppModule {}
