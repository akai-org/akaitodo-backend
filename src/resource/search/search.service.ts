import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/database/entities/event.entity';
import { NoteEntity } from 'src/database/entities/notes.entity';
import { TaskEntity } from 'src/database/entities/task.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { SearchResult } from './dto';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(NoteEntity)
        private noteRepository: Repository<NoteEntity>,
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>,
        @InjectRepository(EventEntity)
        private eventRepository: Repository<EventEntity>,
    ) {}

    private initResultObject = {
        notes: [],
        tasks: [],
        events: [],
    };

    async fetchAllBySearch(
        user: UserEntity,
        search: string,
    ): Promise<SearchResult> {
        const searchResult = {
            notes: await this.findNotesBySearch(user, search),
            tasks: await this.findTasksBySearch(user, search),
            events: await this.findEventsBySearch(user, search),
        };
        return searchResult;
    }

    async fetchNotesBySearch(
        user: UserEntity,
        search: string,
    ): Promise<SearchResult> {
        const foundNotes = await this.findNotesBySearch(user, search);
        const searchResult = {
            ...this.initResultObject,
            notes: [...foundNotes],
        };
        return searchResult;
    }

    async fetchTasksBySearch(user: UserEntity, search: string) {
        const foundTasks = await this.findTasksBySearch(user, search);
        const searchResult = {
            ...this.initResultObject,
            tasks: [...foundTasks],
        };
        return searchResult;
    }

    async fetchEventsBySearch(user: UserEntity, search: string) {
        const foundEvents = await this.findEventsBySearch(user, search);
        const searchResult = {
            ...this.initResultObject,
            events: [...foundEvents],
        };
        return searchResult;
    }

    private async findNotesBySearch(user: UserEntity, search: string) {
        const pattern = `%${search}%`;
        return this.noteRepository.find({
            where: [
                {
                    user: user,
                    title: ILike(pattern),
                },
                {
                    user: user,
                    body: ILike(pattern),
                },
            ],
        });
    }

    private async findTasksBySearch(user: UserEntity, search: string) {
        const pattern = `%${search}%`;
        return this.taskRepository.find({
            where: [
                {
                    user: user,
                    name: ILike(pattern),
                },
                {
                    user: user,
                    description: ILike(pattern),
                },
            ],
        });
    }

    private async findEventsBySearch(createdBy: UserEntity, search: string) {
        const pattern = `%${search}%`;
        return this.eventRepository.find({
            where: [
                {
                    createdBy: createdBy,
                    name: ILike(pattern),
                },
                {
                    createdBy: createdBy,
                    description: ILike(pattern),
                },
            ],
        });
    }
}
