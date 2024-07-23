import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { ForRole, GetUser } from 'src/decorators';
import { UserEntity } from 'src/database/entities/user.entity';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDTO, ReturnUserDTO } from './dto';
import { UserService } from './user.service';
import { UserRoleGuard } from './guard';
import { UserRole } from 'src/types/enums';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userservice: UserService) {}

    @Get('me')
    getMe(@GetUser() user: UserEntity): ReturnUserDTO {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...result } = user;
        return result;
    }

    @Patch('me')
    editMe(
        @GetUser('id') userId: number,
        @Body() editUserDto: EditUserDTO,
    ): Promise<ReturnUserDTO> {
        return this.userservice.editMe(userId, editUserDto);
    }

    @ForRole(UserRole.ADMIN)
    @UseGuards(UserRoleGuard)
    @Get(':id')
    getUserById(
        @Param('id', ParseIntPipe) userId: number,
    ): Promise<ReturnUserDTO> {
        return this.userservice.getUserById(userId);
    }
}
