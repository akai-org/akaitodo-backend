import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );

    const apiConfig = new DocumentBuilder()
        .setTitle('DoDo API')
        .setDescription('DoDo API Documentation')
        .setVersion('1.0')
        // .addTag('Auth')
        // .addTag('Events')
        // .addTag('Notes')
        // .addTag('Search')
        // .addTag('Tasks')
        // .addTag('Users')
        .build();
    const apiDocument = SwaggerModule.createDocument(app, apiConfig);
    SwaggerModule.setup('swagger', app, apiDocument);

    await app.listen(process.env.PORT || 5000, () => {
        console.log(
            `Application is running on port: ${process.env.PORT || 5000}`,
        );
    });
}
bootstrap();
