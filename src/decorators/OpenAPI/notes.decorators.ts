import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { editNoteDTO, NoteDTO } from '../../resource/notes/dto';

export function FetchUserNotesApi() {
    return applyDecorators(ApiOkResponse({ type: [NoteDTO] }));
}

export function AddNoteApi() {
    return applyDecorators(
        ApiCreatedResponse({ type: NoteDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiNotFoundResponse({ description: 'User not found' }),
        ApiBody({ type: NoteDTO }),
    );
}

export function EditNoteByIdApi() {
    return applyDecorators(
        ApiOkResponse(),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiBody({ type: editNoteDTO }),
    );
}
