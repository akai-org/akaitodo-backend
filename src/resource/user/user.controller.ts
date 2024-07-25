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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    EditMeApi,
    GetMeApi,
    GetUserByIdApi,
} from '../../decorators/OpenAPI/user.decorators';

@UseGuards(JwtGuard)
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me')
    @GetMeApi()
    getMe(@GetUser() user: UserEntity): ReturnUserDTO {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...result } = user;
        return result;
    }

    @Patch('me')
    @EditMeApi()
    editMe(
        @GetUser('id') userId: number,
        @Body() editUserDto: EditUserDTO,
    ): Promise<ReturnUserDTO> {
        return this.userService.editMe(userId, editUserDto);
    }

    @ForRole(UserRole.ADMIN)
    @UseGuards(UserRoleGuard)
    @Get(':id')
    @GetUserByIdApi()
    getUserById(
        @Param('id', ParseIntPipe) userId: number,
    ): Promise<ReturnUserDTO> {
        return this.userService.getUserById(userId);
    }
}
