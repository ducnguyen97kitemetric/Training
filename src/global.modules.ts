import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // JwtModule.registerAsync({
    //   useFactory: async (configService: ConfigService) => {

    //     console.log(configService?.get<string>('JWT_SECRET'))

    //     return {
    //       global: true,
    //       secret: configService?.get<string>('JWT_SECRET'),
    //       signOptions: { expiresIn: '300s' }
    //     }
    //   },
    // }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '300s' }
    }),
    UsersModule,
    AuthModule, 
    TypeOrmModule.forRoot(AppDataSource.options),
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
})
export class AppModule {}
