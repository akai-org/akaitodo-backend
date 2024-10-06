import { ApiProperty } from '@nestjs/swagger';
import {
    ReturnEventExceptionDTO,
    ReturnEventRecurrenceDTO,
} from 'src/resource/event/dto';

export class ReturnEventDTO {
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
    @ApiProperty({ type: () => ReturnEventRecurrenceDTO })
    recurrencePattern?: ReturnEventRecurrenceDTO;
    @ApiProperty({ type: [ReturnEventExceptionDTO] })
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
