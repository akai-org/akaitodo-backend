import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export class EditEventDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDate()
    @IsOptional()
    startDate?: Date;

    @IsDate()
    @IsOptional()
    endDate?: Date;

    @IsDate()
    @IsOptional()
    startTime?: Date;

    @IsDate()
    @IsOptional()
    endTime?: Date;

    @IsBoolean()
    @IsOptional()
    isFullDay?: boolean;
}
