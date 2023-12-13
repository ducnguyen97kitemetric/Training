import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dtos/Login.dto';
import { RegisterDto } from 'src/auth/dtos/Register.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async register(userData: RegisterDto) {
    const existingUser = await this.usersService.findUser({ email: userData.email });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.createUser(userData);
  }

  async login(loginData: LoginDto) {
    const user = await this.usersService.findUser({
      email: loginData.email,
      password: loginData.password
    });

    if (!user) {
      throw new HttpException('Login failed. Wrong email or password', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.jwtService.signAsync({ sub: user.id });
    
    return {
      token,
      user
    };
  }
}
