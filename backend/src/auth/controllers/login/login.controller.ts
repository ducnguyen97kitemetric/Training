import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/Login.dto';
import { ValidateLoginUserPipe } from 'src/auth/pipes/validate-login-user/validate-login-user.pipe';
import { Public } from 'src/auth/public.decorator';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('login')
export class LoginController {
  constructor(private authService: AuthService) {

  }

  @Public()
  @Post()
  async login(@Body(ValidateLoginUserPipe) loginData: LoginDto) {
    const user = await this.authService.login(loginData);

    if (!user) {
      throw new HttpException("login failed", HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
