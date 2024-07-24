import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { NoteService } from './notes.service';
import { editNoteDTO, NoteDTO } from './dto';
import { JwtGuard } from '../../auth/guard';
import { GetUser } from '../../decorators';
import { UserEntity } from 'src/database/entities/user.entity';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
export class NoteController {
    constructor(private notesService: NoteService) {}

    @Get()
    @ApiOkResponse({ type: [NoteDTO] })
    fetchUserNotes(@GetUser() user: UserEntity) {
        return this.notesService.fetchUserNotes(user);
    }

    @Post(':id')
    @ApiCreatedResponse({ type: NoteDTO })
    @ApiBadRequestResponse({ description: 'Invalid body' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBody({ type: NoteDTO })
    addNote(@GetUser() user: UserEntity, @Body() noteDto: NoteDTO) {
        return this.notesService.addNote(user, noteDto);
    }

    @Patch(':id')
    @ApiOkResponse()
    @ApiBadRequestResponse({ description: 'Invalid body' })
    @ApiBody({ type: editNoteDTO })
    editNoteById(@Param('id') id: number, @Body() noteDto: editNoteDTO) {
        return this.notesService.editNoteById(id, noteDto);
    }
}
