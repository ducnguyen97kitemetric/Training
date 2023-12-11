import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('value:', value);
    console.log('metadata:', metadata);

    if (!value.userName) {
      throw new HttpException('email cannot empty', HttpStatus.BAD_REQUEST);
    }

    return {
      ...value,
      userName: value.userName.toUpperCase(),
    };
  }
}
