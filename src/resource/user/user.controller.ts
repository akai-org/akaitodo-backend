import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { UserEntity } from 'src/database/entities/user.entity';
import { ForRole, GetUser } from 'src/decorators';
import { EditMeApi, GetMeApi, GetUserByIdApi } from 'src/decorators/OpenAPI';
import { UserRole } from 'src/types';
import { EditUserDTO } from './dto';
import { UserRoleGuard } from './guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me')
    @GetMeApi()
    getMe(@GetUser() user: UserEntity) {
        delete user.hash;
        return user;
    }

    @Patch('me')
    @EditMeApi()
    async editMe(
        @GetUser('id') userId: number,
        @Body() editUserDto: EditUserDTO,
    ) {
        const user = await this.userService.editMe(userId, editUserDto);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    @ForRole(UserRole.ADMIN)
    @UseGuards(UserRoleGuard)
    @Get(':id')
    @GetUserByIdApi()
    async getUserById(@Param('id', ParseIntPipe) userId: number) {
        const user = await this.userService.getUserById(userId);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}
