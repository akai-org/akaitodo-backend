import { RecurrenceType } from '../../../types';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditEventRecurrenceDTO {
    @IsEnum(RecurrenceType)
    @IsOptional()
    @ApiProperty({ required: false })
    recurrenceType?: RecurrenceType;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    separationCount?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    numberOfOccurrences?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    dayOfWeek?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    dayOfMonth?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    monthOfYear?: number;
}
