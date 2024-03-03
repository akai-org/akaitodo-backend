import { IsOptional, IsString } from 'class-validator';

export class NoteDTO {
    id: number;

    @IsString()
    title: string;

    @IsString()
    body: string;

    @IsString()
    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    icon?: string;

    @IsOptional()
    color?: string;
}
