import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { UserEntity } from 'src/database/entities/user.entity';
import { GetUser } from 'src/decorators';
import {
    AddNoteApi,
    EditNoteApi,
    GetUserNotesApi,
} from 'src/decorators/OpenAPI';
import { editNoteDTO, NoteDTO } from './dto';
import { NoteService } from './note.service';

@UseGuards(JwtGuard)
@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
export class NoteController {
    constructor(private notesService: NoteService) {}

    @Get()
    @GetUserNotesApi()
    getUserNotes(@GetUser() user: UserEntity): Promise<NoteDTO[]> {
        return this.notesService.fetchByUser(user);
    }

    @Post()
    @AddNoteApi()
    async addNote(
        @GetUser() user: UserEntity,
        @Body() noteDto: NoteDTO,
    ): Promise<NoteDTO> {
        const note = await this.notesService.add(user, noteDto);
        if (!note)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return note;
    }

    @Patch(':id')
    @EditNoteApi()
    async editNote(
        @Param('id') id: number,
        @Body() noteDto: editNoteDTO,
    ): Promise<void> {
        return await this.notesService.edit(id, noteDto);
    }
}
