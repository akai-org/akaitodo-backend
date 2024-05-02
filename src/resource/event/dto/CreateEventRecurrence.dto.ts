import { RecurrenceType } from '../../../types/enums';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateEventRecurrenceDTO {
    @IsEnum(RecurrenceType)
    @IsNotEmpty()
    recurrenceType: RecurrenceType;

    @IsNumber()
    @IsOptional()
    separationCount?: number;

    @IsNumber()
    @IsOptional()
    numberOfOccurrences?: number;

    @IsNumber()
    @IsOptional()
    dayOfWeek?: number;

    @IsNumber()
    @IsOptional()
    dayOfMonth?: number;

    @IsNumber()
    @IsOptional()
    monthOfYear?: number;
}
