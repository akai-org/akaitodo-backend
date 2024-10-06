import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class EditEventExceptionDTO {
    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false })
    isRescheduled?: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ required: false })
    isCancelled?: boolean;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ required: false })
    originalDate?: Date;

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
