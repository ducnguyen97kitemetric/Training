import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [],
  providers: [],
})
export class AppModule {}
