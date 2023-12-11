import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  password: string;
}