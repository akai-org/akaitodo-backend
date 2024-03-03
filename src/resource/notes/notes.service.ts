import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotesEntity } from 'src/database/entities/notes.entity';
import { Repository } from 'typeorm';
import { NoteDTO, editNoteDTO } from './dto';
import { UserEntity } from 'src/database/entities/user.entity';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(NotesEntity)
        private notesRepository: Repository<NotesEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async fetchAllNotes(userId: number) {
        const user = await this.userRepository.findOneBy({ id: userId });

        return this.notesRepository.find({
            relations: ['user'],
            where: { user },
        });
    }

    async addNote(id: number, noteDto: NoteDTO) {
        const user = await this.userRepository.findOneBy({ id });

        if (!user)
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        if (noteDto.timezoneOffset !== undefined) {
            noteDto.createdAt = new Date();
            const correctTimeStampWithOffset = (
                date: Date,
                offset: number,
            ): Date => {
                const offSetMilliseconds = offset * 60 * 1000;
                const correctDate = new Date(
                    date.getTime() + offSetMilliseconds,
                );
                return correctDate;
            };
            noteDto.createdAt = correctTimeStampWithOffset(
                noteDto.createdAt,
                noteDto.timezoneOffset,
            );
        }

        const newNote = this.notesRepository.create({ ...noteDto, user });

        // Don't need to make the function async when returning the Promise
        return this.notesRepository.save(newNote);
    }

    async editNoteById(id: number, noteDto: editNoteDTO) {
        return this.notesRepository.update({ id }, { ...noteDto });
    }
}
