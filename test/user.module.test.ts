import {
    ClassSerializerInterceptor,
    INestApplication,
    ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';
import { AuthDTO } from 'src/auth/dto';
import { EditUserDTO } from 'src/resource/user/dto';

describe('UserModule', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleRef.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );
        app.useGlobalInterceptors(
            new ClassSerializerInterceptor(app.get(Reflector), {
                strategy: 'excludeAll',
                excludeExtraneousValues: true,
            }),
        );

        await app.listen(5000);
        pactum.request.setBaseUrl('http://localhost:5000');
    });

    afterAll(async () => {
        await app.close();
    });

    describe('Get me', () => {
        it('Should fail if no token', async () => {
            await pactum.spec().get('/users/me').expectStatus(401);
        });

        it('Should return correct user', async () => {
            await pactum
                .spec()
                .post('/auth/login')
                .withBody(new AuthDTO('admin@local.host', 'admin'))
                .expectStatus(200)
                .stores('adminToken', 'accessToken');

            await pactum
                .spec()
                .get('/users/me')
                .withBearerToken('$S{adminToken}')
                .expectStatus(200)
                .expectJsonSchema({
                    properties: {
                        id: { type: 'number' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' },
                    },
                })
                .expectJson({
                    id: 1,
                    username: 'admin',
                    email: 'admin@local.host',
                    role: 'ADMIN',
                });
        });
    });

    describe('Edit me', () => {
        const dto: EditUserDTO = {
            username: 'admin2',
            email: 'admin2@local.host',
        };

        it('Should fail if no token', async () => {
            await pactum.spec().patch('/users/me').expectStatus(401);
        });

        it('Should fail if no body', async () => {
            await pactum
                .spec()
                .patch('/users/me')
                .withBearerToken('$S{adminToken}')
                .expectStatus(400);
        });

        it('Should successfully edit user', async () => {
            await pactum
                .spec()
                .patch('/users/me')
                .withBearerToken('$S{adminToken}')
                .withBody(dto)
                .expectStatus(200)
                .expectJsonSchema({
                    properties: {
                        id: { type: 'number' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' },
                    },
                })
                .expectJson({
                    id: 1,
                    username: 'admin2',
                    email: 'admin2@local.host',
                    role: 'ADMIN',
                });
        });
    });

    describe('Get User by Id', () => {
        it('Should fail if no token', async () => {
            await pactum.spec().get('/users/2').expectStatus(401);
        });

        it('Should fail if no user found', async () => {
            await pactum
                .spec()
                .get('/users/222')
                .withBearerToken('$S{adminToken}')
                .expectStatus(404);
        });

        it('Should fail if user is not an admin', async () => {
            await pactum
                .spec()
                .post('/auth/login')
                .withBody(new AuthDTO('user@local.host', 'user'))
                .expectStatus(200)
                .stores('userToken', 'userToken');

            await pactum
                .spec()
                .get('/users/1')
                .withBearerToken('$S{userToken}')
                .expectStatus(401);
        });

        it('Should return correct user', async () => {
            await pactum
                .spec()
                .get('/users/2')
                .withBearerToken('$S{adminToken}')
                .expectStatus(200)
                .expectJsonSchema({
                    properties: {
                        id: { type: 'number' },
                        username: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string' },
                    },
                })
                .expectJson({
                    id: 2,
                    username: 'user',
                    email: 'user@local.host',
                    role: 'USER',
                });
        });
    });
});
