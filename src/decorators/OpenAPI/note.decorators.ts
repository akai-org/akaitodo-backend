import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { editNoteDTO, NoteDTO } from 'src/resource/note/dto';

export function GetUserNotesApi() {
    return applyDecorators(
        ApiOkResponse({ type: [NoteDTO] }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function AddNoteApi() {
    return applyDecorators(
        ApiCreatedResponse({ type: NoteDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiNotFoundResponse({ description: 'User not found' }),
        ApiBody({ type: NoteDTO }),
    );
}

export function EditNoteApi() {
    return applyDecorators(
        ApiOkResponse(),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiBody({ type: editNoteDTO }),
    );
}
