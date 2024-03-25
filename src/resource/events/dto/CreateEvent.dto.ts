import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinDate,
} from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDate()
    @MinDate(new Date())
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @MinDate(new Date())
    @IsOptional()
    endDate?: Date;

    @IsDate()
    @MinDate(new Date())
    @IsOptional()
    startTime?: Date;

    @IsDate()
    @MinDate(new Date())
    @IsOptional()
    endTime?: Date;

    @IsBoolean()
    @IsNotEmpty()
    isFullDay: boolean;
}
