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
import { ApiProperty } from '@nestjs/swagger';

export class EditEventDTO {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    description?: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ required: false })
    startDate?: Date;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ required: false })
    endDate?: Date;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false })
    isFullDay?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false })
    deleteRecurrence?: boolean;

    @ValidateIf((o) => o.recurrencePattern != null)
    @ValidateNested()
    @Type(() => EditEventRecurrenceDTO)
    @ApiProperty({ type: EditEventRecurrenceDTO })
    recurrencePattern?: EditEventRecurrenceDTO;
}
