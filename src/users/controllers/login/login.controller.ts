import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';
import { ValidateLoginUserPipe } from 'src/users/pipes/validate-login-user/validate-login-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('login')
export class LoginController {
  constructor(private userService: UsersService) {

  }

  @Post()
  async login(@Body(ValidateLoginUserPipe) loginData: LoginUserDto) {
    const user = await this.userService.loginUser(loginData);

    if (!user) {
      throw new HttpException("login failed", HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
