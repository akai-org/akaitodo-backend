import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, JwtTokenDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

    @Post('register')
    register(@Body() authdto: AuthDTO): Promise<JwtTokenDTO> {
        return this.authservice.register(authdto);
    }

    @Post('login')
    login(@Body() authdto: AuthDTO): Promise<JwtTokenDTO> {
        return this.authservice.getAuthByUser(authdto);
    }
}
