import { DataSource } from 'typeorm';

/**
 * DB configuration - MySQL Database configuration
*/

type DatabaseType = 'mysql';

export const AppDataSource = new DataSource({
  type: `${process.env.DB_TYPE}` as DatabaseType,
    host: `${process.env.DB_HOST}`,
    port: +`${process.env.DB_PORT}`,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    entities: ['src/features/**/*.entity.ts'],
    migrations: ['./src/database/migrations/**/*.ts'],
    extra: {
      options: {
        requestTimeout: 30000
      }
    },
});