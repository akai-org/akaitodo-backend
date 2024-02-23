import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../../auth/decorator';
import { UserEntity } from '../../database/entities/user.entity';
import { JwtGuard } from '../../auth/guard';
import { EditUserDTO } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userservice: UserService) {}

    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@GetUser() user: UserEntity): UserEntity {
        return user;
    }

    @UseGuards(JwtGuard)
    @Patch('me')
    editUser(
        @GetUser('id') userID: number,
        @Body() edituserdto: EditUserDTO,
    ): Promise<UserEntity> {
        return this.userservice.editUser(userID, edituserdto);
    }
}
