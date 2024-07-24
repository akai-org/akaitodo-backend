import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtGuard } from '../../auth/guard';
import { GetUser } from '../../decorators';
import { UserEntity } from 'src/database/entities/user.entity';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SearchResultDto } from './dto';

@UseGuards(JwtGuard)
@ApiTags('Search')
@ApiBearerAuth()
@Controller('search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get('/all/:search')
    @ApiOkResponse({ type: SearchResultDto })
    searchAll(@GetUser() user: UserEntity, @Param('search') search: string) {
        return this.searchService.fetchAllBySearch(user, search);
    }

    @Get('/notes/:search')
    @ApiOkResponse({ type: SearchResultDto })
    searchNotes(@GetUser() user: UserEntity, @Param('search') search: string) {
        return this.searchService.fetchNotesBySearch(user, search);
    }

    @Get('/tasks/:search')
    @ApiOkResponse({ type: SearchResultDto })
    searchTasks(@GetUser() user: UserEntity, @Param('search') search: string) {
        return this.searchService.fetchTasksBySearch(user, search);
    }

    @Get('/events/:search')
    @ApiOkResponse({ type: SearchResultDto })
    searchEvents(@GetUser() user: UserEntity, @Param('search') search: string) {
        return this.searchService.fetchEventsBySearch(user, search);
    }
}
