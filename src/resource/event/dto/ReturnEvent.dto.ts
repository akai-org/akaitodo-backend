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
}
