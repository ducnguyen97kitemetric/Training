import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth/auth.guard';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forRoot(AppDataSource.options)],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule {}
