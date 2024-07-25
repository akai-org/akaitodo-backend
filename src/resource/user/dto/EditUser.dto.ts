import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../../types';
import { ApiProperty } from '@nestjs/swagger';

export class EditUserDTO {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    username?: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty({ required: false })
    email?: string;

    @IsEnum(UserRole)
    @IsOptional()
    @ApiProperty({ required: false, enum: UserRole })
    role?: UserRole;
}
