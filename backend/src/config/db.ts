// import 'reflect-metadata';
// import { DataSource } from 'typeorm';
// import { env } from './env';
// import path from 'path';

// const isProd = process.env.NODE_ENV === 'production';

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: env.db.host,
//   port: env.db.port,
//   username: env.db.user,
//   password: env.db.password,
//   database: env.db.name,
//   ssl: env.db.ssl ? { rejectUnauthorized: false } : false,
//   entities: [
//     path.join(__dirname, '../models/*.js'),
//   ],
//   synchronize: true,
//   dropSchema: !isProd,
//   logging: !isProd,
// });

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from './env';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  ssl: env.db.ssl ? { rejectUnauthorized: false } : false,
  entities: [
    isProd
      ? path.join(__dirname, '../models/*.js')
      : path.join(__dirname, '../../src/models/*.ts'),
  ],
  synchronize: true,
  dropSchema: !isProd,
  logging: !isProd,
});