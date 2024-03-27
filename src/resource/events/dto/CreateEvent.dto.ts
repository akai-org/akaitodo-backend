import {
    IsBoolean,
    IsISO8601,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsISO8601({ strict: false, strictSeparator: false })
    @IsNotEmpty()
    startDate: Date;

    @IsISO8601({ strict: false, strictSeparator: false })
    @IsOptional()
    endDate?: Date;

    @IsOptional()
    startTime?: Date;

    @IsOptional()
    endTime?: Date;

    @IsBoolean()
    @IsNotEmpty()
    isFullDay: boolean;
}
