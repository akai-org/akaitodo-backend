import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isDone?: boolean;
}
