import { DataSource } from 'typeorm';

const ormConfig = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOSTNAME,
    port: parseInt(<string>process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/database/entities/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'dev',
    logging: process.env.NODE_ENV === 'dev',
    migrations: ['src/database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrationsRun: false,
});

export default ormConfig;
