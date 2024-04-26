import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { NoteService } from '../notes/notes.service';
import { TaskService } from '../task/task.service';
import { EventService } from '../event/event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from '../../database/entities/notes.entity';
import { TaskEntity } from '../../database/entities/task.entity';
import { EventEntity } from '../../database/entities/event.entity';
import { UserEntity } from '../../database/entities/user.entity';



@Module({
    imports: [TypeOrmModule.forFeature([NoteEntity, TaskEntity, EventEntity, UserEntity])],
    controllers: [SearchController],
    providers: [SearchService, NoteService, TaskService, EventService],
})
export class SearchModule {}
