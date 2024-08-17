import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: 'postgresql://nest_postgres_store_user:1fYBIr9d1xDjyEyrpmPXMP30NmuD3r2Z@dpg-cquh9c5svqrc73etein0-a.oregon-postgres.render.com/nest_postgres_store',
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
