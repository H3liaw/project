import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '192.168.131.68',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '123',
  database: process.env.POSTGRES_DB || 'wallet',
  synchronize: true,
  autoLoadEntities: true,
  dropSchema: false,
  extra: {
    max: Number(process.env.MAX_CONNECTION) || 10,
    connectionTimeoutMillis: 7000,
  },
};
