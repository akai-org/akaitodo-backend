import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayloadDto } from '../dto';
import { ReturnUserDTO } from '../../resource/user/dto';

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

    async validate(payload: JwtPayloadDto): Promise<ReturnUserDTO> {
        const user = await this.userRepository.findOneBy({ id: payload.sub });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...result } = user;
        return result;
    }
}
