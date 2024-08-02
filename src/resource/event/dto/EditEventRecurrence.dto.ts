import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { RecurrenceType } from 'src/types';

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

    eventId?: number;
}
