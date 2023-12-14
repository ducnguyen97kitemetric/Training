import { Inject, Module } from '@nestjs/common';
import { RegisterController } from '../auth/controllers/register/register.controller';
import { LoginController } from '../auth/controllers/login/login.controller';
import { AuthService } from '../auth/services/auth/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        console.log('configService', configService);
        console.log("configService?.get<string>('JWT_SECRET')", configService?.get<string>('JWT_SECRET'))

        return {
          global: true,
          secret: 'secret',
          signOptions: { expiresIn: '300s' }
        }
      },
    }),
  ],
  controllers: [RegisterController, LoginController],
  providers: [AuthService]
})
export class AuthModule {}

