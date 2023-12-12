import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { LoginUserDto } from 'src/users/dtos/LoginUser.dto';
import { RegisterUserDto } from 'src/users/dtos/RegisterUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private visibleFields = [
    'user.id',
    'user.email',
    'user.fullName',
    'user.userType',
    'user.createdAt',
    'user.updatedAt',
  ]

  fetchUsers() {
    return this.usersRepository.createQueryBuilder('user').select(this.visibleFields).getMany();
  }

  async registerUser(userData: RegisterUserDto) {
    const newUser = this.usersRepository.create({
      email: userData.email,
      fullName: userData.fullName,
      password: userData.password,
    })

    const insertedResult = await this.usersRepository.insert(newUser);

    return {
      email: userData.email,
      fullName: userData.fullName,
      ...insertedResult.raw[0],
    }
  }

  loginUser(loginData: LoginUserDto) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where({ email: loginData.email, password: loginData.password })
      .select(this.visibleFields).getOne();
  }

  async updateUser(userId: number, userData: UpdateUserDto) {
    const updatedResult = await this.usersRepository.update(userId, userData);
    if (updatedResult.affected == 0) return null;

    return this.usersRepository
      .createQueryBuilder('user')
      .where({ id: userId })
      .select(this.visibleFields).getOne();
  }
}
