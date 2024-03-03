import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotesEntity } from 'src/database/entities/notes.entity';
import { Repository } from 'typeorm';
import { NoteDTO } from './dto';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(NotesEntity)
        private notesRepository: Repository<NotesEntity>,
    ) {}

    fetchAllNotes() {
        // Testing
        return this.notesRepository.find();
    }

    addNote(noteDto: NoteDTO) {
        const newNote = this.notesRepository.create(noteDto);
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
            newNote.createdAt = correctTimeStampWithOffset(
                noteDto.createdAt,
                noteDto.timezoneOffset,
            );
        }
        // Don't need to make the function async when returning the Promise
        return this.notesRepository.save(newNote);
    }

    editNoteById(id: number, noteDto: NoteDTO) {
        return this.notesRepository.update({ id }, { ...noteDto });
    }
}
