import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDTO {
    @IsString()
    @IsOptional()
    username?: string;

    @IsEmail()
    @IsOptional()
    email?: string;
}
