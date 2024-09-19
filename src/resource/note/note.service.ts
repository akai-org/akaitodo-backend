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
        private noteRepository: Repository<NoteEntity>,
    ) {}

    async fetchUser(user: UserEntity): Promise<NoteDTO[]> {
        return this.noteRepository.find({
            relations: ['user'],
            where: { user },
        });
    }

    async add(user: UserEntity, noteDto: NoteDTO): Promise<NoteDTO> {
        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const newNote = this.noteRepository.create({ ...noteDto, user });

        return this.noteRepository.save(newNote);
    }

    async edit(id: number, noteDto: editNoteDTO): Promise<void> {
        this.noteRepository.update({ id }, { ...noteDto });
    }
}
