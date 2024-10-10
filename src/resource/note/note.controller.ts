import {
    Body,
    Controller,
    Get,
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
    getUserNotes(@GetUser() user: UserEntity) {
        return this.notesService.fetchByUser(user);
    }

    @Post()
    @AddNoteApi()
    async addNote(@GetUser() user: UserEntity, @Body() noteDto: NoteDTO) {
        return await this.notesService.add(user, noteDto);
    }

    @Patch(':id')
    @EditNoteApi()
    async editNote(@Param('id') id: number, @Body() noteDto: editNoteDTO) {
        return await this.notesService.edit(id, noteDto);
    }
}
