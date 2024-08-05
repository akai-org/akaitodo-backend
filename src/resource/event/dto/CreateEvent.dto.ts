import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateIf,
    ValidateNested,
} from 'class-validator';
import { CreateEventRecurrenceDTO } from 'src/resource/event/dto/CreateEventRecurrence.dto';

export class CreateEventDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    description?: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty()
    startDate: Date;

    @IsDateString()
    @IsOptional()
    @ApiProperty({ required: false })
    endDate?: Date;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    isFullDay: boolean;

    @ValidateIf((o) => o.recurrencePattern != null)
    @ValidateNested()
    @Type(() => CreateEventRecurrenceDTO)
    @ApiProperty({ type: CreateEventRecurrenceDTO, required: false })
    recurrencePattern?: CreateEventRecurrenceDTO;
}
