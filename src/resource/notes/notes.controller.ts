import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDTO } from './dto';
import { JwtGuard } from '../../auth/guard';
import { editNoteDTO } from './dto/editNote.dto';

@UseGuards(JwtGuard)
@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Get()
    fetchAllNotes(@Param('id', ParseIntPipe) userId: number) {
        return this.notesService.fetchAllNotes(userId);
    }

    @Post(':id')
    addNote(@Param('id', ParseIntPipe) id: number, @Body() noteDto: NoteDTO) {
        return this.notesService.addNote(id, noteDto);
    }

    @Patch(':id')
    editNoteById(@Param('id') id: number, @Body() noteDto: editNoteDTO) {
        console.log('id', id);
        return this.notesService.editNoteById(id, noteDto);
    }
}
