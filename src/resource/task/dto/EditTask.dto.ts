import { IsBoolean, IsOptional, IsString, IsNumber } from 'class-validator';

export class EditTaskDTO {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isDone?: boolean;
}
