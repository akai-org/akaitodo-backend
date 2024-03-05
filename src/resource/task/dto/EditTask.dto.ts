import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class EditTaskDTO {
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
