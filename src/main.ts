import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
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

    const openApiConfig = new DocumentBuilder()
        .setTitle('DoDo API')
        .setDescription('DoDo API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const openApiDocument = SwaggerModule.createDocument(app, openApiConfig);
    SwaggerModule.setup('swagger', app, openApiDocument);

    await app.listen(process.env.PORT || 5000, () => {
        console.log(
            `Application is running on port: ${process.env.PORT || 5000}`,
        );
    });
}
bootstrap();
