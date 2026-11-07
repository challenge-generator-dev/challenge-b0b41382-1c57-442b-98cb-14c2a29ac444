import { registerAs } from '@nestjs/config';

export const configuration = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    sql: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      name: process.env.DATABASE_NAME || 'inventory',
    },
    nosql: {
      host: process.env.MONGODB_HOST || 'localhost',
      port: parseInt(process.env.MONGODB_PORT || '27017', 10),
      database: process.env.MONGODB_DATABASE || 'inventory_nosql',
      username: process.env.MONGODB_USERNAME || 'mongo',
      password: process.env.MONGODB_PASSWORD || 'mongo',
    },
  },
  environment: process.env.NODE_ENV || 'development',
}));

export interface AppConfig {
  port: number;
  database: {
    sql: {
      host: string;
      port: number;
      username: string;
      password: string;
      name: string;
    };
    nosql: {
      host: string;
      port: number;
      database: string;
      username: string;
      password: string;
    };
  };
  environment: string;
}