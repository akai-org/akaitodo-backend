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
    CreateTaskDTO,
    EditTaskDTO,
    ReturnTaskDTO,
} from 'src/resource/task/dto';

export function GetUserTasksApi() {
    return applyDecorators(
        ApiOkResponse({ type: [ReturnTaskDTO] }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function GetTaskByIdApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnTaskDTO }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiNotFoundResponse({ description: 'Task not found' }),
    );
}

export function AddTaskApi() {
    return applyDecorators(
        ApiCreatedResponse({ type: ReturnTaskDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiBody({ type: CreateTaskDTO }),
    );
}

export function EditTaskApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnTaskDTO }),
        ApiBadRequestResponse({
            description: 'Invalid body / ID is not valid in URL and body',
        }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiNotFoundResponse({ description: 'Task not found' }),
        ApiBody({ type: EditTaskDTO }),
    );
}

export function DeleteTaskApi() {
    return applyDecorators(
        ApiNoContentResponse(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiNotFoundResponse({ description: 'Task not found' }),
    );
}
