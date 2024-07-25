import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditTaskDTO {
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    description?: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false })
    isDone?: boolean;
}
