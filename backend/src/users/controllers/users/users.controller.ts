 import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Req, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin/admin.guard';
import { IndividualGuard } from 'src/auth/guards/individual/individual.guard';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { ValidateUpdateUserPipe } from 'src/users/pipes/validate-update-user/validate-update-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {

  }

  @UseGuards(AdminGuard)
  @Get()
  getUsers(@Req() request: Request & { userId?: number }) {
    return this.usersService.fetchUsers();
  }

  @UseGuards(IndividualGuard)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidateUpdateUserPipe) userData: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.updateUser(id, userData);

    if (!updatedUser) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
    }

    return { user: updatedUser };
  }
}
