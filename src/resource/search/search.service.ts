import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { NoteService } from '../notes/notes.service';
import { TaskService } from '../task/task.service';
import { EventService } from '../event/event.service';
import { SearchResult } from './dto';

@Injectable()
export class SearchService {
    constructor(
        private noteService: NoteService,
        private taskService: TaskService,
        private eventService: EventService
    ) {}

    async fetchAllBySearch(user: UserEntity, query: string) {
        const searchResult = new SearchResult;
        searchResult.setNotes(await this.findNotesBySearch(user, query));
        searchResult.setTasks(await this.findTasksBySearch(user, query));
        searchResult.setEvents(await this.findEventsBySearch(user, query));
        return searchResult;
    }

    async fetchNotesBySearch(user: UserEntity, query: string) {
        const searchResult = new SearchResult;
        searchResult.setNotes(await this.findNotesBySearch(user, query));
        return searchResult;
    }

    async fetchTasksBySearch(user: UserEntity, query: string) {
        const searchResult = new SearchResult;
        searchResult.setTasks(await this.findTasksBySearch(user, query));
        return searchResult;
    }

    async fetchEventsBySearch(user: UserEntity, query: string) {
        const searchResult = new SearchResult;
        searchResult.setEvents(await this.findEventsBySearch(user, query));
        return searchResult;
    }

    private async findNotesBySearch(user: UserEntity, query: string) {
        const pattern = new RegExp(query);
        return (await this.noteService.fetchUserNotes(user)).filter((note) => {
            return pattern.test(note.title) || pattern.test(note.body)
        });
    }

    private async findTasksBySearch(user: UserEntity, query: string) {
        const pattern = new RegExp(query);
        return (await this.taskService.getAllUserTasks(user)).filter((task) => {
            return pattern.test(task.name) || pattern.test(task.description)
        });
    }

    private async findEventsBySearch(user: UserEntity, query: string) {
        const pattern = new RegExp(query);
        return (await this.eventService.getEventsByUserId(user.id)).filter((event) => {
            return pattern.test(event.name) || pattern.test(event.description)
        });
    }
}
