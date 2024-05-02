import { RecurrenceType } from '../../../types/enums';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class EditEventRecurrenceDTO {
    @IsEnum(RecurrenceType)
    @IsOptional()
    recurrenceType?: RecurrenceType;

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
