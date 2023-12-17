import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';


const configService = new ConfigService();
console.log('env', configService?.get<string>('JWT_SECRET'));

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mac',
  password: '',
  database: 'chatapp',
  synchronize: false,
  migrationsRun: false,
  entities: [`${__dirname}/**/**.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
});
