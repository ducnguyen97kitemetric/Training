import { Module } from '@nestjs/common';
import { RegisterController } from '../auth/controllers/register/register.controller';
import { LoginController } from '../auth/controllers/login/login.controller';
import { AuthService } from '../auth/services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '300s' }
    })
  ],
  controllers: [RegisterController, LoginController],
  providers: [AuthService]
})
export class AuthModule {}

