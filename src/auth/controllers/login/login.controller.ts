import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/auth/dtos/LoginUser.dto';
import { ValidateLoginUserPipe } from 'src/auth/pipes/validate-login-user/validate-login-user.pipe';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('login')
export class LoginController {
  constructor(private authService: AuthService) {

  }

  @Post()
  async login(@Body(ValidateLoginUserPipe) loginData: LoginUserDto) {
    const user = await this.authService.login(loginData);

    if (!user) {
      throw new HttpException("login failed", HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
