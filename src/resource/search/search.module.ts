import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from '../../database/entities/notes.entity';
import { TaskEntity } from '../../database/entities/task.entity';
import { EventEntity } from '../../database/entities/event.entity';
import { UserEntity } from '../../database/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            NoteEntity,
            TaskEntity,
            EventEntity,
            UserEntity,
        ]),
    ],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
