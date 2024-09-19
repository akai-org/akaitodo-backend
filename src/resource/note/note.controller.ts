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
    EditNoteByIdApi,
    FetchUserNotesApi,
} from '../../decorators/OpenAPI';

@UseGuards(JwtGuard)
@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
export class NoteController {
    constructor(private notesService: NoteService) {}

    @Get()
    @FetchUserNotesApi()
    fetchUserNotes(@GetUser() user: UserEntity) {
        return this.notesService.fetchUserNotes(user);
    }

    @Post(':id')
    @AddNoteApi()
    addNote(@GetUser() user: UserEntity, @Body() noteDto: NoteDTO) {
        return this.notesService.addNote(user, noteDto);
    }

    @Patch(':id')
    @EditNoteByIdApi()
    editNoteById(@Param('id') id: number, @Body() noteDto: editNoteDTO) {
        return this.notesService.editNoteById(id, noteDto);
    }
}
