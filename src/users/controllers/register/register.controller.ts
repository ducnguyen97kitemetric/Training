import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dtos/RegisterUser.dto';
import { ValidateRegisterUserPipe } from 'src/users/pipes/validate-register-user/validate-register-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('register')
export class RegisterController {
  constructor(private userService: UsersService) {

  }

  @Post()
  register(@Body(ValidateRegisterUserPipe) userData: RegisterUserDto) {
    return this.userService.registerUser(userData);
  }  
}
