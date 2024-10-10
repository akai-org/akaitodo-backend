import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/types';

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
