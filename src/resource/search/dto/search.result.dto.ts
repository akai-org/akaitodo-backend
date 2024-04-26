import { EventEntity } from "src/database/entities/event.entity"
import { NoteEntity } from "src/database/entities/notes.entity"
import { ReturnTaskDTO } from "src/resource/task/dto";

enum ResourceType {
    NOTES = "NOTES",
    TASKS = "TASKS",
    EVENTS = "EVENTS"
}

type Entity = NoteEntity | ReturnTaskDTO | EventEntity;
type Result = Record<ResourceType, Entity[]>

export class SearchResult {
    constructor() {
        this.result = {
            NOTES: [],
            TASKS: [],
            EVENTS: [],
        }
    }

    result: Result

    setNotes(notes: NoteEntity[]) {
        this.result.NOTES = notes;
    }

    setTasks(tasks: ReturnTaskDTO[]) {
        this.result.TASKS = tasks;
    }

    setEvents(events: EventEntity[]) {
        this.result.EVENTS = events;
    }
}
