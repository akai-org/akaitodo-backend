import {
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { CreateEventRecurrenceDTO } from './CreateEventRecurrence.dto';
import { Type } from 'class-transformer';

export class CreateEventDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @IsDateString()
    @IsOptional()
    endDate?: Date;

    @IsBoolean()
    @IsNotEmpty()
    isFullDay: boolean;

    @ValidateIf((o) => o.recurrencePattern != null)
    @ValidateNested()
    @Type(() => CreateEventRecurrenceDTO)
    recurrencePattern: CreateEventRecurrenceDTO;
}
