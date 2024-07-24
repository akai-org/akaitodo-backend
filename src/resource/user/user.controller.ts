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
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(private readonly userservice: UserService) {}

    @Get('me')
    @ApiOkResponse({ type: ReturnUserDTO })
    getMe(@GetUser() user: UserEntity): ReturnUserDTO {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hash, ...result } = user;
        return result;
    }

    @Patch('me')
    @ApiOkResponse({ type: ReturnUserDTO })
    @ApiBadRequestResponse({ description: 'Invalid body' })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiBody({ type: EditUserDTO })
    editMe(
        @GetUser('id') userId: number,
        @Body() editUserDto: EditUserDTO,
    ): Promise<ReturnUserDTO> {
        return this.userservice.editMe(userId, editUserDto);
    }

    @ForRole(UserRole.ADMIN)
    @UseGuards(UserRoleGuard)
    @Get(':id')
    @ApiOkResponse({ type: ReturnUserDTO })
    @ApiNotFoundResponse({ description: 'User not found' })
    getUserById(
        @Param('id', ParseIntPipe) userId: number,
    ): Promise<ReturnUserDTO> {
        return this.userservice.getUserById(userId);
    }
}
