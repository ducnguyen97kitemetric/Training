import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { RegisterController } from './controllers/register/register.controller';
import { LoginController } from './controllers/login/login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, RegisterController, LoginController],
  providers: [UsersService]
})
export class UsersModule {}
