import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { GoogleClient } from './GoogleClient';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, GoogleClient],
})
export class AuthModule {}
