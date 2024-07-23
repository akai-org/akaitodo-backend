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
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Notes')
@Controller('notes')
export class NoteController {
    constructor(private notesService: NoteService) {}

    @Get()
    fetchUserNotes(@GetUser() user: UserEntity) {
        return this.notesService.fetchUserNotes(user);
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
