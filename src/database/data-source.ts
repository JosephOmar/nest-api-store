import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_RENDER,
  synchronize: false,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  ssl: process.env.POSTGRES_SSL === 'true',
  extra: {
    ssl:
      process.env.POSTGRES_SSL === 'true'
        ? {
            rejectUnauthorized: false,
          }
        : null,
  },
});
