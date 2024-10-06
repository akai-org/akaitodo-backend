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

    constructor(
        id: number,
        name: string,
        description: string,
        startDate: Date,
        endDate: Date,
        isFullDay: boolean,
        createdById: number,
        recurrencePattern: ReturnEventRecurrenceDTO | undefined,
        exceptions: ReturnEventExceptionDTO[] | undefined,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isFullDay = isFullDay;
        this.createdById = createdById;
        this.recurrencePattern = recurrencePattern;
        this.exceptions = exceptions;
    }
}
