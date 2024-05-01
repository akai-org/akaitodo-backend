import { EventEntity } from "src/database/entities/event.entity"
import { NoteEntity } from "src/database/entities/notes.entity"
import { ReturnTaskDTO } from "src/resource/task/dto";

enum ResourceType {
    NOTES = "NOTES",
    TASKS = "TASKS",
    EVENTS = "EVENTS"
}

type Entity = NoteEntity | ReturnTaskDTO | EventEntity;
export type SearchResult = Record<ResourceType, Entity[]>;
