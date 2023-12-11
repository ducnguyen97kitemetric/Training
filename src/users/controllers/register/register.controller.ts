import { Body, Controller, HttpException, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dtos/RegisterUser.dto';
import { ValidateRegisterUserPipe } from 'src/users/pipes/validate-register-user/validate-register-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('register')
export class RegisterController {
  constructor(private userService: UsersService) {

  }

  @Post()
  @UsePipes(new ValidationPipe())
  register(@Body(ValidateRegisterUserPipe) userData: RegisterUserDto) {
    console.log('in register controller');
    console.log("userData:", userData);
    
    this.userService.registerUser(userData);

    return this.userService.fetchUserByEmail(userData.email);
  }  
}