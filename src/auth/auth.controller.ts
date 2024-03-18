import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, JwtTokenDTO, RegisterDTO } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authservice: AuthService) {}

    @Post('register')
    register(@Body() registerdto: RegisterDTO): Promise<JwtTokenDTO> {
        return this.authservice.register(registerdto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() authdto: AuthDTO): Promise<JwtTokenDTO> {
        return this.authservice.getAuthByUser(authdto);
    }
}
