import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
    ReturnEventExceptionDTO,
    ReturnEventRecurrenceDTO,
} from 'src/resource/event/dto';

export class ReturnEventWithDatesDTO {
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

    @ApiProperty({ type: [String], isArray: true })
    @Expose()
    eventDates: string[];

    @ApiProperty({ type: [ReturnEventExceptionDTO], required: false })
    @Type(() => ReturnEventRecurrenceDTO)
    @Expose()
    eventExceptions?: ReturnEventExceptionDTO[];

    constructor(
        id: number,
        name: string,
        description: string | undefined,
        startDate: Date,
        endDate: Date | undefined,
        isFullDay: boolean,
        createdById: number,
        eventDates: string[],
        eventExceptions: ReturnEventExceptionDTO[] | undefined,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isFullDay = isFullDay;
        this.createdById = createdById;
        this.eventDates = eventDates;
        this.eventExceptions = eventExceptions;
    }
}
