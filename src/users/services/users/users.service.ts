import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/auth/dtos/LoginUser.dto';
import { RegisterUserDto } from 'src/auth/dtos/RegisterUser.dto';
import { User } from 'src/models/user.entity';
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

  async createUser(userData: RegisterUserDto) {
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

  findUser(clause: any) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where(clause)
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
