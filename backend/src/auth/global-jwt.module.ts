import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

const configService = new ConfigService();

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        global: true,
        secret: configService?.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '300s' }
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [JwtModule]
})
export class GlobalJwtModule {}
