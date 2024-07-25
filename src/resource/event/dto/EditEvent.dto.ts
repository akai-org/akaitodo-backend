import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
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
}
