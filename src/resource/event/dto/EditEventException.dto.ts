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
}
