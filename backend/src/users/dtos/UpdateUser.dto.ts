import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { UserType } from "src/types/user";

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  fullName?: string;

  @IsOptional()
  @IsNotEmpty()
  password?: string;

  // Only use when we need more admins to test
  // @IsOptional()
  // @IsNotEmpty()
  // userType?: UserType;
}
