import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserType } from 'src/types/user';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.usersService.findUser({ id: request?.userId });

    return user?.userType === UserType.admin;
  }
}
