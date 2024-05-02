import {
    IsBoolean,
    IsDateString,
    IsOptional,
    IsString,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EditEventRecurrenceDTO } from './EditEventRecurrence.dto';

export class EditEventDTO {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    @IsOptional()
    startDate?: Date;

    @IsDateString()
    @IsOptional()
    endDate?: Date;

    @IsBoolean()
    @IsOptional()
    isFullDay?: boolean;

    @IsBoolean()
    @IsOptional()
    deleteRecurrence?: boolean;

    @ValidateIf((o) => o.recurrencePattern != null)
    @ValidateNested()
    @Type(() => EditEventRecurrenceDTO)
    recurrencePattern: EditEventRecurrenceDTO;
}
