 import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { ValidateUpdateUserPipe } from 'src/users/pipes/validate-update-user/validate-update-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {

  }

  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body(ValidateUpdateUserPipe) userData: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, userData);

    if (!updatedUser) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
    }

    return updatedUser;
  }
}
