import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO, JwtTokenDTO, RegisterDTO } from './dto';
import { Request, Response } from 'express';
import { GoogleGuard } from './guard';

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

    @UseGuards(GoogleGuard)
    @Get('google/callback')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
        try {
            res.status(HttpStatus.OK).send();
        } catch (err) {
            res.status(500).send({ success: false, message: err.message });
        }
    }
}
