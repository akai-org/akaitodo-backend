import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../../auth/decorator';
import { UserEntity } from '../../database/entities/user.entity';
import { JwtGuard } from '../../auth/guard';
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me')
    getMe(@GetUser() user: UserEntity) {
        return user;
    }

    @Patch('me')
    editUser() {}

    @Get()
    async getAll() {
        return this.userService.getAll();
    }
}
