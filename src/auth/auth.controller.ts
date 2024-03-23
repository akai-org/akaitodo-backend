import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, JwtTokenDTO, RegisterDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDTO): Promise<JwtTokenDTO> {
        return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() authDto: AuthDTO): Promise<JwtTokenDTO> {
        return this.authService.getAuthByUser(authDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('google/login')
    async googleLogin(
        @Body('gToken') googleToken: string,
    ): Promise<JwtTokenDTO> {
        return this.authService.handleGoogleAuth(googleToken);
    }
}
