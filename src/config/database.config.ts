import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOSTNAME || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/../database/entities/*.entity{.ts,.js}`],
    synchronize: process.env.NODE_ENV === 'dev',
    logging: process.env.NODE_ENV === 'dev',
    migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    cli: {
        migrationsDir: 'src/database/migrations',
    },
}));
