import { Injectable } from '@nestjs/common';
import { LoginUserDto } from 'src/auth/dtos/LoginUser.dto';
import { RegisterUserDto } from 'src/auth/dtos/RegisterUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  register(userData: RegisterUserDto) {
    return this.usersService.createUser(userData);
  }

  login(loginData: LoginUserDto) {
    return this.usersService.findUser({
      email: loginData.email,
      password: loginData.password
    })
  }
}
