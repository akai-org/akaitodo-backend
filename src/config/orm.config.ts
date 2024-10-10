import { DataSource } from 'typeorm';

const ormConfig = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/database/entities/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'dev',
    logging: process.env.NODE_ENV === 'dev',
    migrations: ['src/database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    entitySkipConstructor: true,
});

export default ormConfig;
