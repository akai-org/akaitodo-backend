import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuth2Client } from 'google-auth-library';
import { UserEntity } from 'src/database/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, OAuth2Client],
})
export class AuthModule {}
