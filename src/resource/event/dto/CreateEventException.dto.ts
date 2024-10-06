import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsOptional,
} from 'class-validator';

export class CreateEventExceptionDTO {
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isRescheduled: boolean;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isCancelled: boolean;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    originalDate: Date;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ required: false })
    startDate?: Date;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ required: false })
    endDate?: Date;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isFullDay: boolean;

    constructor(
        isRescheduled: boolean,
        isCancelled: boolean,
        originalDate: Date,
        startDate: Date,
        endDate: Date,
        isFullDay: boolean,
    ) {
        this.isRescheduled = isRescheduled;
        this.isCancelled = isCancelled;
        this.originalDate = originalDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isFullDay = isFullDay;
    }
}
