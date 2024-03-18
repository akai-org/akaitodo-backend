import {
    ConflictException,
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
import { GoogleClient } from './GoogleClient';
import { TokenPayload } from 'google-auth-library';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly googleclient: GoogleClient,
        private readonly jwtservice: JwtService,
        readonly configservice: ConfigService,
    ) {}

    async register(registerdto: RegisterDTO): Promise<JwtTokenDTO> {
        const hashedPassword = await argon.hash(registerdto.password);
        try {
            const user = this.userRepository.create({
                username: registerdto.username,
                email: registerdto.email,
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

    async getAuthByUser(authdto: AuthDTO): Promise<JwtTokenDTO> {
        const user = await this.userRepository.findOneBy({
            email: authdto.email,
        });
        if (!user) throw new NotFoundException('User not found');

        const passwordMatch = await argon.verify(user.hash, authdto.password);
        if (!passwordMatch)
            throw new UnauthorizedException('Incorrect password');

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string): Promise<JwtTokenDTO> {
        const payload = {
            sub: userId,
            email,
        };

        const token = await this.jwtservice.signAsync(payload, {
            expiresIn: '5h',
            secret: this.configservice.get('JWT_SECRET'),
        });

        return {
            accessToken: token,
        };
    }

    async handleGoogleAuth(googleToken: string): Promise<JwtTokenDTO> {
        const ticket = await this.googleclient.verifyIdToken({
            idToken: googleToken,
        });
        const payload: TokenPayload = ticket.getPayload();
        const user = await this.userRepository.findOneBy({
            email: payload.email,
        });

        if (!user) {
            return this.registerGoogle(payload);
        }

        return this.signToken(user.id, user.email);
    }
}
