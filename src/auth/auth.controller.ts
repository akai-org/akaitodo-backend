import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoogleLoginApi, LoginApi, RegisterApi } from 'src/decorators/OpenAPI';
import { AuthService } from './auth.service';
import { AuthDTO, RegisterDTO } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @RegisterApi()
    register(@Body() registerDto: RegisterDTO) {
        return this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @LoginApi()
    login(@Body() authDto: AuthDTO) {
        return this.authService.getAuthByUser(authDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('google/login')
    @GoogleLoginApi()
    async googleLogin(@Body('gToken') googleToken: string) {
        return this.authService.handleGoogleAuth(googleToken);
    }
}
