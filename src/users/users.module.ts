import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { AnotherMiddleware } from './middlewares/another/another.middleware';
import { RegisterController } from './controllers/register/register.controller';
import { LoginController } from './controllers/login/login.controller';

@Module({
  controllers: [UsersController, RegisterController, LoginController],
  providers: [UsersService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExampleMiddleware).forRoutes({
        path: 'users',
        method: RequestMethod.GET
      }, {
        path: 'users/byemail/:email',
        method: RequestMethod.GET,
      }).apply(AnotherMiddleware).forRoutes({
        path: 'users',
        method: RequestMethod.GET
      }, {
        path: 'users/byemail/:email',
        method: RequestMethod.GET,
      });
  }
}
