import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { editNoteDTO, NoteDTO } from './dto';
import { JwtGuard } from '../../auth/guard';
import { GetUser } from '../../decorators';
import { UserEntity } from 'src/database/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    AddNoteApi,
    EditNoteApi as EditNoteApi,
    GetUserNotesApi as GetUserNotesApi,
} from '../../decorators/OpenAPI';

@UseGuards(JwtGuard)
@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
export class NoteController {
    constructor(private notesService: NoteService) {}

    @Get()
    @GetUserNotesApi()
    getUserNotes(@GetUser() user: UserEntity): Promise<NoteDTO[]> {
        return this.notesService.fetchUserNotes(user);
    }

    @Post(':id')
    @AddNoteApi()
    addNote(@GetUser() user: UserEntity, @Body() noteDto: NoteDTO): Promise<NoteDTO> {
        return this.notesService.addNote(user, noteDto);
    }

    @Patch(':id')
    @EditNoteApi()
    editNote(@Param('id') id: number, @Body() noteDto: editNoteDTO): Promise<void> {
        return this.notesService.editNoteById(id, noteDto);
    }
}
