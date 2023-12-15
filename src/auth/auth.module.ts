import { Module } from '@nestjs/common';
import { RegisterController } from '../auth/controllers/register/register.controller';
import { LoginController } from '../auth/controllers/login/login.controller';
import { AuthService } from '../auth/services/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { GlobalJwtModule } from './global-jwt.module';

@Module({
  imports: [
    UsersModule,
    GlobalJwtModule,
  ],
  controllers: [RegisterController, LoginController],
  providers: [AuthService]
})
export class AuthModule {}

