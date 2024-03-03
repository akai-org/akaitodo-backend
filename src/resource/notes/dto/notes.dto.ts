import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class NoteDTO {
    id: number;

    @IsString()
    title: string;

    @IsString()
    body: string;

    @IsString()
    @IsOptional()
    createdAt: Date;

    @IsOptional()
    Icon?: string;

    @IsOptional()
    Color?: string;

    @IsNumber()
    @IsOptional()
    timezoneOffset?: number;
}
