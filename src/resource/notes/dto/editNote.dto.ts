import { IsOptional, IsString } from 'class-validator';

export class editNoteDTO {
    id: number;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    body?: string;

    @IsString()
    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    icon?: string;

    @IsOptional()
    color?: string;
}
