import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { AuthDTO, JwtTokenDTO, RegisterDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly googleClient: OAuth2Client,
        private readonly jwtService: JwtService,
        readonly configService: ConfigService,
    ) {}

    async register(registerDto: RegisterDTO): Promise<JwtTokenDTO> {
        const hashedPassword = await argon.hash(registerDto.password);
        try {
            const user = this.userRepository.create({
                username: registerDto.username,
                email: registerDto.email,
                hash: hashedPassword,
            });
            await this.userRepository.insert(user);
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof QueryFailedError)
                throw new ConflictException('Email already used');
            throw error;
        }
    }

    async registerGoogle(payload: TokenPayload): Promise<JwtTokenDTO> {
        try {
            const user = this.userRepository.create({
                username: payload.name,
                email: payload.email,
                isLocal: false,
            });
            await this.userRepository.insert(user);
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof QueryFailedError)
                throw new ConflictException('Email already used');
            throw error;
        }
    }

    async getAuthByUser(authDto: AuthDTO): Promise<JwtTokenDTO> {
        const user = await this.userRepository.findOneBy({
            email: authDto.email,
        });
        if (!user) throw new NotFoundException('User not found');
        if (!user.isLocal || user.hash == null)
            throw new ForbiddenException('Forbidden login method');

        const passwordMatch = await argon.verify(user.hash, authDto.password);
        if (!passwordMatch)
            throw new UnauthorizedException('Incorrect password');

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<JwtTokenDTO> {
        const payload = {
            sub: userId,
            email,
        };

        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '5h',
            secret: this.configService.get('JWT_SECRET'),
        });

        return {
            accessToken: token,
        };
    }

    async handleGoogleAuth(googleToken: string): Promise<JwtTokenDTO> {
        const payload = await this.googleClient
            .verifyIdToken({
                idToken: googleToken,
                audience: this.configService.get('GOOGLE_ID'),
            })
            .then((res) => res.getPayload())
            .catch(() => {
                throw new ForbiddenException();
            });

        const user = await this.userRepository.findOneBy({
            email: payload.email,
        });

        if (!user) {
            return this.registerGoogle(payload);
        }

        return this.signToken(user.id, user.email);
    }
}
