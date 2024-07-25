import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiNotFoundResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { EditUserDTO, ReturnUserDTO } from '../../resource/user/dto';

export function GetMeApi() {
    return applyDecorators(ApiOkResponse({ type: ReturnUserDTO }));
}

export function EditMeApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnUserDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiNotFoundResponse({ description: 'User not found' }),
        ApiBody({ type: EditUserDTO }),
    );
}

export function GetUserByIdApi() {
    return applyDecorators(
        ApiOkResponse({ type: ReturnUserDTO }),
        ApiNotFoundResponse({ description: 'User not found' }),
    );
}
