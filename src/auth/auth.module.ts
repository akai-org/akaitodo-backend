import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        {
            provide: 'googleClient',
            useFactory: (configService: ConfigService) => {
                return new OAuth2Client(
                    configService.get('GOOGLE_ID'),
                    configService.get('GOOGLE_SECRET'),
                );
            },
            inject: [ConfigService],
        },
    ],
})
export class AuthModule {}
