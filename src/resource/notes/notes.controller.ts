import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    UseGuards,
} from '@nestjs/common';
import { NoteService } from './notes.service';
import { NoteDTO } from './dto';
import { JwtGuard } from '../../auth/guard';
import { editNoteDTO } from './dto/editNote.dto';
import { GetUser } from '../../auth/decorator';
import { UserEntity } from 'src/database/entities/user.entity';

@UseGuards(JwtGuard)
@Controller('notes')
export class NoteController {
    constructor(private notesService: NoteService) {}

    @Get()
    fetchNotes(@GetUser() user: UserEntity) {
        return this.notesService.fetchNotes(user);
    }

    @Post(':id')
    addNote(@GetUser() user: UserEntity, @Body() noteDto: NoteDTO) {
        return this.notesService.addNote(user, noteDto);
    }

    @Patch(':id')
    editNoteById(@Param('id') id: number, @Body() noteDto: editNoteDTO) {
        return this.notesService.editNoteById(id, noteDto);
    }
}
