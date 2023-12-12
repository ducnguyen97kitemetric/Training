import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { UserType } from 'src/types/user';
import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';
import { RegisterUserDto } from 'src/users/dtos/RegisterUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  fetchUsers() {
    return this.usersRepository.createQueryBuilder('user').select([
      'user.id',
      'user.email',
      'user.fullName',
      'user.userType',
      'user.createdAt',
      'user.updatedAt',
    ]).getMany();
  }

  registerUser(userData: RegisterUserDto) {
    const newUser = this.usersRepository.create({
      email: userData.email,
      fullName: userData.fullName,
      password: userData.password,
      userType: UserType.basic,
    })

    return this.usersRepository.insert(newUser);
  }

  loginUser(loginData: LoginUserDto) {
    return this.usersRepository.findOneBy({ email: loginData.email, password: loginData.password });
  }
}
