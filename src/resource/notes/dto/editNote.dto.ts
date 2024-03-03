import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

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
    createdAt: Date;

    @IsOptional()
    Icon?: string;

    @IsOptional()
    Color?: string;

    @IsNumber()
    @IsOptional()
    timezoneOffset?: number;
}
