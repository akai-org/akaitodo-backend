import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
