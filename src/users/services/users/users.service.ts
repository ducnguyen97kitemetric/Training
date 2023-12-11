import { Injectable } from '@nestjs/common';
import { User, UserType } from 'src/types/user';
import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';
import { RegisterUserDto } from 'src/users/dtos/RegisterUser.dto';

@Injectable()
export class UsersService {
  private fakeUsers: User[] = [{
    id: 1,
    fullName: 'Andy',
    email: 'andy@gmail.com',
    userType: UserType.admin,
    password: "123",
  }, {
    id: 2,
    fullName: 'Bob',
    email: 'bob@gmail.com',
    userType: UserType.basic,
    password: "123",
  }, {
    id: 3,
    fullName: 'Luke',
    email: 'luke@gmail.com',
    userType: UserType.basic,
    password: "123",
  }]


  fetchUsers() {
    return this.fakeUsers;
  }

  registerUser(userData: RegisterUserDto) {
    const maxId = this.fakeUsers.reduce((acc, user) => {
      if (user.id > acc) acc = user.id;
      return acc;
    }, 0);
    this.fakeUsers.push({
      ...userData,
      userType: UserType.basic,
      id: maxId + 1,
    });
  }

  loginUser(loginData: LoginUserDto) {
    return this.fakeUsers.find(user => (
      user.email === loginData.email && user.password === loginData.password
    ));

    
  }

  fetchUserByEmail(email: string) {
    return this.fakeUsers.find((user) => user.email === email);
  }
}
