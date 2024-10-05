import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthDTO, JwtTokenDTO, RegisterDTO } from 'src/auth/dto';

export function RegisterApi() {
    return applyDecorators(
        ApiOkResponse({ type: JwtTokenDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiConflictResponse({ description: 'Email already used' }),
        ApiBody({ type: RegisterDTO }),
    );
}

export function LoginApi() {
    return applyDecorators(
        ApiOkResponse({ type: JwtTokenDTO }),
        ApiBadRequestResponse({ description: 'Invalid body' }),
        ApiUnauthorizedResponse({ description: 'Incorrect password' }),
        ApiForbiddenResponse({
            description:
                'Forbidden login method (user should login with Google Account)',
        }),
        ApiNotFoundResponse({ description: 'User not found' }),
        ApiBody({ type: AuthDTO }),
    );
}

export function GoogleLoginApi() {
    return applyDecorators(
        ApiOkResponse({ type: JwtTokenDTO }),
        ApiForbiddenResponse({ description: 'Invalid Google credentials' }),
        ApiConflictResponse({ description: 'Email already used' }),
    );
}
