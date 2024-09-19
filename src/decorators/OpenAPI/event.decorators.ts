import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
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
    return applyDecorators(ApiOkResponse({ type: [ReturnEventDTO] }));
}

export function GetUserEventsBetweenDatesApi() {
    return applyDecorators(ApiOkResponse({ type: [ReturnEventWithDatesDTO] }));
}

export function GetEventByIdApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnEventDTO }),
        ApiNotFoundResponse({ description: 'Event not found' }),
    );
}

export function GetEventExceptionByIdApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnEventExceptionDTO }),
        ApiNotFoundResponse({ description: 'Exception not found' }),
    );
}

export function AddEventApi() {
    return applyDecorators(
        ApiCreatedResponse({ type: ReturnEventDTO }),
        ApiNotFoundResponse({ description: 'Event not found' }),
        ApiBody({ type: CreateEventDTO }),
    );
}

export function AddEventExceptionApi() {
    return applyDecorators(
        ApiCreatedResponse({ type: ReturnEventExceptionDTO }),
        ApiBody({ type: CreateEventExceptionDTO }),
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

export function EditExceptionApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnEventExceptionDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiNotFoundResponse({ description: "Exception doesn't exist" }),
        ApiBody({ type: EditEventExceptionDTO }),
    );
}

export function DeleteEventApi() {
    return applyDecorators(ApiNoContentResponse());
}

export function DeleteExceptionApi() {
    return applyDecorators(ApiNoContentResponse());
}
