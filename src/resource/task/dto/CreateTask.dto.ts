import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
    @IsString()
    @IsOptional()
    name?: string = 'No name';

    @IsString()
    @IsOptional()
    description?: string = 'No Description';

    @IsOptional()
    @IsBoolean()
    isDone?: boolean = false;
}
