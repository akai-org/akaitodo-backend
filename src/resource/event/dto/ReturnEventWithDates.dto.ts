import { ApiProperty } from '@nestjs/swagger';
import { ReturnEventExceptionDTO } from 'src/resource/event/dto/ReturnEventException.dto';

export class ReturnEventWithDatesDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description?: string;
    @ApiProperty()
    startDate: Date;
    @ApiProperty()
    endDate?: Date;
    @ApiProperty()
    isFullDay: boolean;
    @ApiProperty()
    createdById: number;
    @ApiProperty({ type: [String], isArray: true })
    eventDates: string[];
    @ApiProperty({ type: [ReturnEventExceptionDTO], required: false })
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
