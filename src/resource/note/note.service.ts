import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from 'src/database/entities/notes.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { editNoteDTO, NoteDTO } from './dto';

@Injectable()
export class NoteService {
    constructor(
        @InjectRepository(NoteEntity)
        private noteRepository: Repository<NoteEntity>,
    ) {}

    async fetchByUser(user: UserEntity) {
        return this.noteRepository.find({
            relations: ['user'],
            where: { user },
        });
    }

    async add(user: UserEntity, noteDto: NoteDTO) {
        if (!user) return null;
        const newNote = this.noteRepository.create({ ...noteDto, user });

        return this.noteRepository.save(newNote);
    }

    async edit(id: number, noteDto: editNoteDTO) {
        await this.noteRepository.update({ id }, { ...noteDto });
    }
}
