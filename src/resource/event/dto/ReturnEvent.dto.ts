import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
    ReturnEventExceptionDTO,
    ReturnEventRecurrenceDTO,
} from 'src/resource/event/dto';

export class ReturnEventDTO {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    description?: string;

    @ApiProperty()
    @Expose()
    startDate: Date;

    @ApiProperty()
    @Expose()
    endDate?: Date;

    @ApiProperty()
    @Expose()
    isFullDay: boolean;

    @ApiProperty()
    @Expose()
    createdById: number;

    @ApiProperty({ type: () => ReturnEventRecurrenceDTO })
    @Type(() => ReturnEventRecurrenceDTO)
    @Expose()
    recurrencePattern?: ReturnEventRecurrenceDTO;

    @ApiProperty({ type: [ReturnEventExceptionDTO] })
    @Type(() => ReturnEventRecurrenceDTO)
    @Expose()
    exceptions?: ReturnEventExceptionDTO[];
}
