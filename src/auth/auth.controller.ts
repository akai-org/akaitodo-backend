import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, JwtTokenDTO, RegisterDTO } from './dto';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOkResponse({ type: JwtTokenDTO })
    @ApiBadRequestResponse({ description: 'Invalid body' })
    @ApiConflictResponse({ description: 'Email already used' })
    @ApiBody({ type: RegisterDTO })
    register(@Body() registerDto: RegisterDTO): Promise<JwtTokenDTO> {
        return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOkResponse({ type: JwtTokenDTO })
    @ApiBadRequestResponse({ description: 'Invalid body' })
    @ApiUnauthorizedResponse({ description: 'Incorrect password' })
    @ApiForbiddenResponse({
        description:
            'Forbidden login method (user should login with Google Account)',
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBody({ type: AuthDTO })
    login(@Body() authDto: AuthDTO): Promise<JwtTokenDTO> {
        return this.authService.getAuthByUser(authDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('google/login')
    @ApiOkResponse({ type: JwtTokenDTO })
    @ApiForbiddenResponse()
    @ApiConflictResponse({ description: 'Email already used' })
    async googleLogin(
        @Body('gToken') googleToken: string,
    ): Promise<JwtTokenDTO> {
        return this.authService.handleGoogleAuth(googleToken);
    }
}
