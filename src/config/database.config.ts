import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as any,
  host: 'localhost',
  // host: process.env.DB_HOST,
  port: 3306,
  // port: parseInt(process.env.DB_PORT, 10),
  username: 'utrademdp',
  // username: decrypt(process.env.DB_USERNAME),
  password: 'utrademdp',
  // password: decrypt(process.env.DB_PASSWORD),
  database: 'utrademdp',
  // database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
