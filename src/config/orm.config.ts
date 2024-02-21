import { DataSource } from 'typeorm';

const ormConfig = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'dodo',
    password: 'dodo',
    database: 'dodobase',
    entities: ['src/database/entities/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'dev',
    logging: process.env.NODE_ENV === 'dev',
    migrations: ['src/database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrationsRun: false,
});

export default ormConfig;
