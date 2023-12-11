import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {

  }

  @Get()
  getUsers(@Query('sortBy') sortBy: string, @Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
    return this.userService.fetchUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log('userData:', userData);
    this.userService.createUser(userData);

    return {};
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    console.log('id: ', id);
    return {};
  }

  @Get('/byemail/:email')
  @UseGuards(AuthGuard)
  getUserByEmail(@Param('email') email: string) {
    const user = this.userService.fetchUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  @Get('/posts')
  getUsersPosts() {
    return [{
      userName: 'Andy',
      email: 'andy@gmail.com',
      posts: [{
        id: 1,
        title: 'Post 1'
      }, {
        id: 2,
        title: 'Post 2'
      }]
    }, {
      userName: 'Bob',
      email: 'bob@gmail.com',
      posts: []
    }, {
      userName: 'Luke',
      email: 'luke@gmail.com',
      posts: []
    }]
  }
}
