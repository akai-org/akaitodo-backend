import { ReturnEventDTO } from 'src/resource/event/dto';
import { NoteDTO } from 'src/resource/notes/dto';
import { ReturnTaskDTO } from 'src/resource/task/dto';
import { ApiProperty } from '@nestjs/swagger';

enum ResourceType {
    NOTES = 'notes',
    TASKS = 'tasks',
    EVENTS = 'events',
}

type ReturnDTO = NoteDTO | ReturnTaskDTO | ReturnEventDTO;
export type SearchResult = Record<ResourceType, ReturnDTO[]>;

export class SearchResultDto {
    @ApiProperty()
    notes: NoteDTO[];
    @ApiProperty()
    tasks: ReturnTaskDTO[];
    @ApiProperty()
    events: ReturnEventDTO[];
}
