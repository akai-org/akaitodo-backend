import {
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    description?: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    startDate: Date;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ required: false })
    endDate?: Date;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isFullDay: boolean;
}
