import { Injectable } from '@nestjs/common';
import { SearchResult } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from 'typeorm';
import { NoteEntity } from 'src/database/entities/notes.entity';
import { TaskEntity } from 'src/database/entities/task.entity';
import { EventEntity } from 'src/database/entities/event.entity';
import { UserEntity } from 'src/database/entities/user.entity';


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

    async fetchAllBySearch(user: UserEntity, search: string): Promise<SearchResult> {
        const searchResult = {
            NOTES: await this.findNotesBySearch(user, search),
            TASKS: await this.findTasksBySearch(user, search),
            EVENTS: await this.findEventsBySearch(user, search)
        };
        return searchResult;
    }

    async fetchNotesBySearch(user: UserEntity, search: string): Promise<SearchResult> {
        const searchResult = {
            NOTES: await this.findNotesBySearch(user, search),
            TASKS: [],
            EVENTS: []
        }
        return searchResult;
    }

    async fetchTasksBySearch(user: UserEntity, search: string) {
        const searchResult = {
            NOTES: [],
            TASKS: await this.findTasksBySearch(user, search),
            EVENTS: []
        }
        return searchResult;
    }

    async fetchEventsBySearch(user: UserEntity, search: string) {
        const searchResult = {
            NOTES: [],
            TASKS: [],
            EVENTS: await this.findEventsBySearch(user, search)
        }
        return searchResult;
    }

    private async findNotesBySearch(user: UserEntity, search: string) {
        const pattern = `%${search}%`;
        return this.noteRepository.find({
            relations: ['user'],
            where: [
                {
                    user: user,
                    title: Like(pattern)
                },
                {
                    user: user,
                    body: Like(pattern)
                }
            ]
        });
    }

    private async findTasksBySearch(user: UserEntity, search: string) {
        const pattern = `%${search}%`;
        return this.taskRepository.find({
            relations: ['user'],
            where: [
                {
                    user: user,
                    name: Like(pattern)
                },
                {
                    user: user,
                    description: Like(pattern)
                }
            ]
        });
    }

    private async findEventsBySearch(createdBy: UserEntity, search: string) {
        const pattern = `%${search}%`;
        return this.eventRepository.find({
            relations: ['createdBy'],
            where: [
                {
                    createdBy: createdBy,
                    name: Like(pattern)
                },
                {
                    createdBy: createdBy,
                    description: Like(pattern)
                }
            ]
        });
    }
}
