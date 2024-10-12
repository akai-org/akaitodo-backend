import {
    ClassSerializerInterceptor,
    INestApplication,
    ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';
import { AuthDTO, RegisterDTO } from 'src/auth/dto';

describe('AuthModule', () => {
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

    describe('Register', () => {
        const dto = new RegisterDTO(
            'stanley',
            's.mazik2002@gmail.com',
            'stachu02',
        );

        it('Should fail if no body', async () => {
            await pactum.spec().post('/auth/register').expectStatus(400);
        });

        it('Should fail if no username', async () => {
            await pactum
                .spec()
                .post('/auth/register')
                .withBody({
                    email: dto.email,
                    password: dto.password,
                })
                .expectStatus(400);
        });

        it('Should fail if no email', async () => {
            await pactum
                .spec()
                .post('/auth/register')
                .withBody({
                    username: dto.username,
                    password: dto.password,
                })
                .expectStatus(400);
        });

        it('Should fail if no password', async () => {
            await pactum
                .spec()
                .post('/auth/register')
                .withBody({
                    username: dto.username,
                    email: dto.email,
                })
                .expectStatus(400);
        });

        it('Should register correct user', async () => {
            await pactum
                .spec()
                .post('/auth/register')
                .withBody(dto)
                .expectStatus(201)
                .expectJsonSchema({
                    properties: {
                        accessToken: {
                            type: 'string',
                        },
                    },
                });
        });

        it('Should fail if mail already used', async () => {
            await pactum
                .spec()
                .post('/auth/register')
                .withBody(dto)
                .expectStatus(409);
        });
    });

    describe('Login', () => {
        const dto = new AuthDTO('s.mazik2002@gmail.com', 'stachu02');

        it('Should fail if empty body', async () => {
            await pactum.spec().post('/auth/login').expectStatus(400);
        });

        it('Should fail if no email', async () => {
            await pactum
                .spec()
                .post('/auth/login')
                .withBody({ password: dto.password })
                .expectStatus(400);
        });

        it('Should fail if no password', async () => {
            await pactum
                .spec()
                .post('/auth/login')
                .withBody({ email: dto.email })
                .expectStatus(400);
        });

        it('Should fail if incorrect password', async () => {
            await pactum
                .spec()
                .post('/auth/login')
                .withBody({ email: dto.email, password: 'wrong_password' })
                .expectStatus(401);
        });

        it("Should fail if user doesn't exist", async () => {
            await pactum
                .spec()
                .post('/auth/login')
                .withBody({ email: 'smazik@mail.com', password: dto.password })
                .expectStatus(404);
        });

        it('Should login correct user', async () => {
            await pactum
                .spec()
                .post('/auth/login')
                .withBody(dto)
                .expectStatus(200)
                .expectJsonSchema({
                    properties: {
                        accessToken: {
                            type: 'string',
                        },
                    },
                });
        });
    });

    it.todo('Google login');
});
