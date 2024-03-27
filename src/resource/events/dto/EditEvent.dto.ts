import { IsBoolean, IsISO8601, IsOptional, IsString } from 'class-validator';

export class EditEventDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsISO8601({ strict: false, strictSeparator: false })
    @IsOptional()
    startDate?: Date;

    @IsISO8601({ strict: false, strictSeparator: false })
    @IsOptional()
    endDate?: Date;

    @IsOptional()
    startTime?: Date;

    @IsOptional()
    endTime?: Date;

    @IsBoolean()
    @IsOptional()
    isFullDay?: boolean;
}
