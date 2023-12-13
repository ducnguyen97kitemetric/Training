import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/Register.dto';
import { ValidateRegisterUserPipe } from 'src/auth/pipes/validate-register-user/validate-register-user.pipe';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('register')
export class RegisterController {
  constructor(private authService: AuthService) {

  }

  @Post()
  register(@Body(ValidateRegisterUserPipe) userData: RegisterDto) {
    return this.authService.register(userData);
  }  
}
