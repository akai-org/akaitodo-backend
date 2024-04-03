import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../../types/enums';

export class EditUserDTO {
    @IsString()
    @IsOptional()
    username?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
