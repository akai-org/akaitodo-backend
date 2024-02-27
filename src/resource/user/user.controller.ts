import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { GetUser, ForRole } from '../../decorators';
import { UserEntity, UserRole } from '../../database/entities/user.entity';
import { JwtGuard } from '../../auth/guard';
import { EditUserDTO, ReturnUserDTO } from './dto';
import { UserService } from './user.service';
import { UserRoleGuard } from './guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private readonly userservice: UserService) {}

    @Get('me')
    getMe(@GetUser() user: UserEntity): UserEntity {
        return user;
    }

    @Patch('me')
    editMe(
        @GetUser('id') userID: number,
        @Body() edituserdto: EditUserDTO,
    ): Promise<ReturnUserDTO> {
        return this.userservice.editMe(userID, edituserdto);
    }

    @ForRole(UserRole.Admin)
    @UseGuards(UserRoleGuard)
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) userID: number) {
        return this.userservice.getUserById(userID);
    }
}
