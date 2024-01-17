import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'user123',
  password: 'pass123',
  database: 'dbpostgres',
  synchronize: true,
  logging: false,
  entities: ['src/app/models/**/*.ts'],
  subscribers: [],
  migrations: ['src/database/migrations/**/*.ts'],
});
