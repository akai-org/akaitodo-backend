import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { EditUserDTO, ReturnUserDTO } from 'src/resource/user/dto';

export function GetMeApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnUserDTO }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function EditMeApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnUserDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiNotFoundResponse({ description: 'User not found' }),
        ApiBody({ type: EditUserDTO }),
    );
}

export function GetUserByIdApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnUserDTO }),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
        ApiForbiddenResponse({ description: 'Forbidden resource' }),
        ApiNotFoundResponse({ description: 'User not found' }),
    );
}
