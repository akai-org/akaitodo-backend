import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/database/entities/event.entity';
import { EventExceptionEntity } from 'src/database/entities/event.exception.entity';
import { RecurrenceEntity } from 'src/database/entities/recurrence.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfig, DatabaseConfig } from './config';
import { EventModule } from './resource/event/event.module';
import { NoteModule } from './resource/notes/notes.module';
import { SearchModule } from './resource/search/search.module';
import { TaskModule } from './resource/task/task.module';
import { UserModule } from './resource/user/user.module';

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
        TypeOrmModule.forFeature([
            UserEntity,
            EventEntity,
            EventExceptionEntity,
            RecurrenceEntity,
        ]),

        // General controllers
        UserModule,
        AuthModule,
        NoteModule,
        TaskModule,
        EventModule,
        SearchModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
