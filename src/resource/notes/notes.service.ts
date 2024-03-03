import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from 'src/database/entities/notes.entity';
import { Repository } from 'typeorm';
import { NoteDTO, editNoteDTO } from './dto';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(NoteEntity)
        private notesRepository: Repository<NoteEntity>,
    ) {}

    async fetchNotes(user: UserEntity) {
        return this.notesRepository.find({
            relations: ['user'],
            where: { user },
        });
    }

    async addNote(user: UserEntity, noteDto: NoteDTO) {
        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const newNote = this.notesRepository.create({ ...noteDto, user });

        return this.notesRepository.save(newNote);
    }

    async editNoteById(id: number, noteDto: editNoteDTO) {
        return this.notesRepository.update({ id }, { ...noteDto });
    }
}
