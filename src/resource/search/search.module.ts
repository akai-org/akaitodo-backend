import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { NoteModule } from '../notes/notes.module';
import { TaskModule } from '../task/task.module';
import { EventModule } from '../event/event.module';

@Module({
    imports: [NoteModule, TaskModule, EventModule],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
