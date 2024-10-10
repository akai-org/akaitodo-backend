import { DataSource } from 'typeorm';

type LocalDatabaseTypes = 'mysql' | 'postgres' | 'mongodb';

const ormConfig = new DataSource({
    type: process.env.DB_TYPE as LocalDatabaseTypes || 'mysql',
    host: process.env.DB_HOSTNAME || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/database/entities/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    migrations: ['src/database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrationsRun: true,
    entitySkipConstructor: true,
});

export default ormConfig;
