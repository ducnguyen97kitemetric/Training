import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  userName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}