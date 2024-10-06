import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtGuard } from 'src/auth/guard';
import { UserEntity } from 'src/database/entities/user.entity';
import { ForRole, GetUser } from 'src/decorators';
import { EditMeApi, GetMeApi, GetUserByIdApi } from 'src/decorators/OpenAPI';
import { UserRole } from 'src/types';
import { EditUserDTO, ReturnUserDTO } from './dto';
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
        return plainToInstance(ReturnUserDTO, user);
    }

    @Patch('me')
    @EditMeApi()
    async editMe(
        @GetUser('id') userId: number,
        @Body() editUserDto: EditUserDTO,
    ) {
        return await this.userService.editMe(userId, editUserDto);
    }

    @ForRole(UserRole.ADMIN)
    @UseGuards(UserRoleGuard)
    @Get(':id')
    @GetUserByIdApi()
    async getUserById(@Param('id', ParseIntPipe) userId: number) {
        return await this.userService.getUserById(userId);
    }
}
