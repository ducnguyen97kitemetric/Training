import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RegisterController } from '../auth/controllers/register/register.controller';
import { LoginController } from '../auth/controllers/login/login.controller';
import { AuthService } from '../auth/services/auth/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService?.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '300s' }
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [RegisterController, LoginController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}

