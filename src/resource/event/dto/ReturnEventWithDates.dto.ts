import { ApiProperty } from '@nestjs/swagger';
import { ReturnEventExceptionDTO } from 'src/resource/event/dto/ReturnEventException.dto';

export class ReturnEventWithDatesDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    startDate: Date;
    @ApiProperty()
    endDate: Date;
    @ApiProperty()
    isFullDay: boolean;
    @ApiProperty()
    createdById: number;
    @ApiProperty({ type: [String], isArray: true })
    eventDates: string[];
    @ApiProperty({ type: [ReturnEventExceptionDTO], required: false })
    eventExceptions?: ReturnEventExceptionDTO[];
}
