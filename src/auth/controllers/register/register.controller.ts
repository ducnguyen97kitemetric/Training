import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dtos/RegisterUser.dto';
import { ValidateRegisterUserPipe } from 'src/auth/pipes/validate-register-user/validate-register-user.pipe';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('register')
export class RegisterController {
  constructor(private authService: AuthService) {

  }

  @Post()
  register(@Body(ValidateRegisterUserPipe) userData: RegisterUserDto) {
    return this.authService.register(userData);
  }  
}
