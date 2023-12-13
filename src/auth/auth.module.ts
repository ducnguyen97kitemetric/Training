import { Module } from '@nestjs/common';
import { RegisterController } from '../auth/controllers/register/register.controller';
import { LoginController } from '../auth/controllers/login/login.controller';
import { AuthService } from '../auth/services/auth/auth.service';
import { UserService } from 'src/users/services/users/user.service';

@Module({
  imports: [],
  controllers: [RegisterController, LoginController],
  providers: [UserService, AuthService]
})
export class AuthModule {}
