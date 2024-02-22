import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        readonly configservice: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configservice.get('JWT_SECRET'),
        });
    }

    async validate(payload: {
        sub: number;
        email: string;
    }): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: payload.sub,
            },
        });
        delete user.password;
        return user;
    }
}
