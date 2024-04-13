import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from 'src/database/entities/note.entity';
import { Repository } from 'typeorm';
import { NoteDTO, editNoteDTO } from './dto';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(NoteEntity)
        private noteRepository: Repository<NoteEntity>,
    ) {}

    async fetchUserNotes(user: UserEntity) {
        return this.noteRepository.find({
            relations: ['user'],
            where: { user },
        });
    }

    async addNote(user: UserEntity, noteDto: NoteDTO) {
        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const newNote = this.noteRepository.create({ ...noteDto, user });

        return this.noteRepository.save(newNote);
    }

    async editNoteById(id: number, noteDto: editNoteDTO) {
        return this.noteRepository.update({ id }, { ...noteDto });
    }

    async deleteNoteById(id: number) {
        return this.noteRepository.delete({ id });
    }
}
