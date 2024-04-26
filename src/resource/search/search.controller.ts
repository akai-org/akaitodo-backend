import {
    Controller,
    Get,
    Query,
    UseGuards,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtGuard } from '../../auth/guard';
import { GetUser } from '../../decorators';
import { UserEntity } from 'src/database/entities/user.entity';

@UseGuards(JwtGuard)
@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get('/all')
    searchAll(@GetUser() user: UserEntity, @Query('query') query: string) {
        return this.searchService.fetchAllBySearch(user, query);
    }

    @Get('/notes')
    searchNotes(@GetUser() user: UserEntity, @Query('query') query: string) {
        return this.searchService.fetchNotesBySearch(user, query);
    }

    @Get('/tasks')
    searchTasks(@GetUser() user: UserEntity, @Query('query') query: string) {
        return this.searchService.fetchTasksBySearch(user, query);
    }

    @Get('/events')
    searchEvents(@GetUser() user: UserEntity, @Query('query') query: string) {
        return this.searchService.fetchEventsBySearch(user, query);
    }
}
