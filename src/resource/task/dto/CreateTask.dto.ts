import { IsBoolean, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateTaskDTO {
    @IsNumber()
    id?: number;

    @IsNumber()
    userId?: number;

    @IsString()
    @IsOptional()
    name?: string="No name";

    @IsString()
    @IsOptional()
    description?: string="No sescription";

    @IsOptional()
    @IsBoolean()
    isDone?: boolean=false;

}
