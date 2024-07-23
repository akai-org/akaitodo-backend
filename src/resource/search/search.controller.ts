import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtGuard } from '../../auth/guard';
import { GetUser } from '../../decorators';
import { UserEntity } from 'src/database/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Search')
@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get('/all/:search')
    searchAll(@GetUser() user: UserEntity, @Param('search') search: string) {
        return this.searchService.fetchAllBySearch(user, search);
    }

    @Get('/notes/:search')
    searchNotes(@GetUser() user: UserEntity, @Param('search') search: string) {
        return this.searchService.fetchNotesBySearch(user, search);
    }

    @Get('/tasks/:search')
    searchTasks(@GetUser() user: UserEntity, @Param('search') search: string) {
        return this.searchService.fetchTasksBySearch(user, search);
    }

    @Get('/events/:search')
    searchEvents(@GetUser() user: UserEntity, @Param('search') search: string) {
        return this.searchService.fetchEventsBySearch(user, search);
    }
}
