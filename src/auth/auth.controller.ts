import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, JwtTokenDTO, RegisterDTO } from './dto';
import { ApiTags } from '@nestjs/swagger';
import {
    GoogleLoginApi,
    LoginApi,
    RegisterApi,
} from '../decorators/OpenAPI/auth.decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @RegisterApi()
    register(@Body() registerDto: RegisterDTO): Promise<JwtTokenDTO> {
        return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @LoginApi()
    login(@Body() authDto: AuthDTO): Promise<JwtTokenDTO> {
        return this.authService.getAuthByUser(authDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('google/login')
    @GoogleLoginApi()
    async googleLogin(
        @Body('gToken') googleToken: string,
    ): Promise<JwtTokenDTO> {
        return this.authService.handleGoogleAuth(googleToken);
    }
}
