import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
    nodenv: process.env.NODE_ENV,
    runtime: process.env.RUNTIME,
}));
