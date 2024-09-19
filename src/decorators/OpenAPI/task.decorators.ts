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
    CreateTaskDTO,
    EditTaskDTO,
    ReturnTaskDTO,
} from '../../resource/task/dto';

export function GetUserTasksApi() {
    return applyDecorators(ApiOkResponse({ type: [ReturnTaskDTO] }));
}

export function GetTaskByIdApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnTaskDTO }),
        ApiNotFoundResponse({ description: 'Task not found' }),
    );
}

export function AddTaskApi() {
    return applyDecorators(
        ApiCreatedResponse({ type: ReturnTaskDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiBody({ type: CreateTaskDTO }),
    );
}

export function EditTaskApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnTaskDTO }),
        ApiBadRequestResponse({
            description: 'Invalid body / ID is not valid in URL and body',
        }),
        ApiNotFoundResponse({ description: 'Task not found' }),
        ApiBody({ type: EditTaskDTO }),
    );
}

export function DeleteTaskApi() {
    return applyDecorators(
        ApiNoContentResponse(),
        ApiNotFoundResponse({ description: 'Task not found' }),
    );
}
