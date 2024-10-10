import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { RecurrenceType } from 'src/types';

export class CreateEventRecurrenceDTO {
    @IsEnum(RecurrenceType)
    @IsNotEmpty()
    @ApiProperty()
    recurrenceType: RecurrenceType;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    separationCount?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
    numberOfOccurrences?: number;
}
