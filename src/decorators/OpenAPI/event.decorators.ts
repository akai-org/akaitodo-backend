import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
    CreateEventDTO,
    CreateEventExceptionDTO,
    EditEventDTO,
    EditEventExceptionDTO,
    ReturnEventDTO,
    ReturnEventExceptionDTO,
    ReturnEventWithDatesDTO,
} from 'src/resource/event/dto';

export function GetUserEventsApi() {
    return applyDecorators(
        ApiOkResponse({ type: [ReturnEventDTO] }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function GetUserEventsBetweenDatesApi() {
    return applyDecorators(
        ApiOkResponse({ type: [ReturnEventWithDatesDTO] }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function GetEventByIdApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnEventDTO }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiNotFoundResponse({ description: 'Event not found' }),
    );
}

export function GetEventExceptionByIdApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnEventExceptionDTO }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiNotFoundResponse({ description: 'Exception not found' }),
    );
}

export function AddEventApi() {
    return applyDecorators(
        ApiCreatedResponse({ type: ReturnEventDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiBody({ type: CreateEventDTO }),
    );
}

export function AddEventExceptionApi() {
    return applyDecorators(
        ApiCreatedResponse({ type: ReturnEventExceptionDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiBody({ type: CreateEventExceptionDTO }),
    );
}

export function EditEventApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnEventDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiNotFoundResponse({ description: "Event doesn't exist" }),
        ApiBody({ type: EditEventDTO }),
    );
}

export function EditExceptionApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnEventExceptionDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiNotFoundResponse({ description: "Exception doesn't exist" }),
        ApiBody({ type: EditEventExceptionDTO }),
    );
}

export function DeleteEventApi() {
    return applyDecorators(
        ApiNoContentResponse(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function DeleteExceptionApi() {
    return applyDecorators(
        ApiNoContentResponse(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}
