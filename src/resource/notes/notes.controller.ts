import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDTO } from './dto';
import { JwtGuard } from '../../auth/guard';

@UseGuards(JwtGuard)
@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Get()
    fetchAllNotes() {
        return this.notesService.fetchAllNotes();
    }

    @Post()
    addNote(@Body() noteDto: NoteDTO) {
        return this.notesService.addNote(noteDto);
    }

    @Patch(':id')
    editNoteById(@Param('id') id: number, @Body() noteDto: NoteDTO) {
        console.log('id', id);
        return this.notesService.editNoteById(id, noteDto);
    }
}
