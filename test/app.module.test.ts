import {
    ClassSerializerInterceptor,
    INestApplication,
    ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';

describe('AppModule', () => {
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

    it('Hello world', async () => {
        await pactum
            .spec()
            .get('/')
            .expectStatus(200)
            .expectBody('Hello World!');
    });

    it.todo('Should pass');
});
