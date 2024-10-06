import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
    @IsString()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    description?: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false })
    isDone?: boolean;

    constructor(name: string, description: string, isDone: boolean) {
        this.name = name;
        this.description = description;
        this.isDone = isDone;
    }
}
