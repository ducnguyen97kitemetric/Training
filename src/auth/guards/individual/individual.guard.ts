import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IndividualGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return request?.userId === parseInt(request.params.id);
  }
}
