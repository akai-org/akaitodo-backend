import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig, DatabaseConfig } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './resource/user/user.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './resource/notes/notes.module';
import { EventModule } from './resource/event/event.module';

@Module({
    imports: [
        // Configs
        ConfigModule.forRoot({
            envFilePath: `.${process.env.RUNTIME}.env`,
            isGlobal: true,
            load: [AppConfig, DatabaseConfig],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                ...configService.get('database'),
            }),
            inject: [ConfigService],
        }),

        // General controllers
        UserModule,
        NoteModule,
        AuthModule,
        EventModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
