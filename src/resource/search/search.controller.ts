import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtGuard } from '../../auth/guard';
import { GetUser } from '../../decorators';
import { UserEntity } from 'src/database/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchApi } from '../../decorators/OpenAPI';

@UseGuards(JwtGuard)
@ApiTags('Search')
@ApiBearerAuth()
@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get('/all/:search')
    @SearchApi()
    async searchAll(
        @GetUser() user: UserEntity,
        @Param('search') search: string,
    ) {
        return this.searchService.fetchAllBySearch(user, search);
    }

    @Get('/notes/:search')
    @SearchApi()
    async searchNotes(
        @GetUser() user: UserEntity,
        @Param('search') search: string,
    ) {
        return this.searchService.fetchNotesBySearch(user, search);
    }

    @Get('/tasks/:search')
    @SearchApi()
    async searchTasks(
        @GetUser() user: UserEntity,
        @Param('search') search: string,
    ) {
        return this.searchService.fetchTasksBySearch(user, search);
    }

    @Get('/events/:search')
    @SearchApi()
    async searchEvents(
        @GetUser() user: UserEntity,
        @Param('search') search: string,
    ) {
        return this.searchService.fetchEventsBySearch(user, search);
    }
}
