import { Injectable } from '@nestjs/common';
import { User } from 'src/utils/types';

@Injectable()
export class UsersService {
  private fakeUsers: User[] = [{
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


  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userData: User) {
    this.fakeUsers.push(userData);
  }

  fetchUserByEmail(email: string) {
    return this.fakeUsers.find((user) => user.email === email);
  }
}
