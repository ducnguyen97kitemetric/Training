import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        console.log('configService', configService);
        console.log("configService?.get<string>('JWT_SECRET')", configService?.get<string>('JWT_SECRET'))

        return {
          global: true,
          secret: 'secret',
          signOptions: { expiresIn: '300s' }
        }
      },
    }),
  ],
  providers: [ConfigService],
  exports: [JwtModule]
})
export class GlobalJwtModule {}
