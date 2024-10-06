import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsOptional,
    IsString,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { EditEventRecurrenceDTO } from 'src/resource/event/dto/EditEventRecurrence.dto';

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
    @ApiProperty({ type: EditEventRecurrenceDTO, required: false })
    recurrencePattern?: EditEventRecurrenceDTO;

    constructor(
        name: string,
        description: string,
        startDate: Date,
        endDate: Date,
        isFullDay: boolean,
        deleteRecurrence: boolean,
        recurrencePattern: EditEventRecurrenceDTO,
    ) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isFullDay = isFullDay;
        this.deleteRecurrence = deleteRecurrence;
        this.recurrencePattern = recurrencePattern;
    }
}
