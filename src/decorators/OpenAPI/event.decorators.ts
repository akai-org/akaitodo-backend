import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { EditEventDTO, ReturnEventDTO } from '../../resource/event/dto';

export function GetUserEventsApi() {
    return applyDecorators(ApiOkResponse({ type: [ReturnEventDTO] }));
}

export function GetEventByIdApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnEventDTO }),
        ApiNotFoundResponse({ description: 'Event not found' }),
    );
}

export function CreateEventByCurrentUserApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnEventDTO }),
        ApiNotFoundResponse({ description: 'Event not found' }),
    );
}

export function EditEventApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnEventDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiNotFoundResponse({ description: "Event doesn't exist" }),
        ApiBody({ type: EditEventDTO }),
    );
}

export function DeleteEventApi() {
    return applyDecorators(ApiNoContentResponse());
}
