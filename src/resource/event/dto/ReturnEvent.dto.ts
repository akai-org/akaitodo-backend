import { ApiProperty } from '@nestjs/swagger';
import { ReturnEventRecurrenceDTO } from 'src/resource/event/dto/ReturnEventRecurrence.dto';

export class ReturnEventDTO {
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
    @ApiProperty({ type: ReturnEventRecurrenceDTO })
    recurrencePattern?: ReturnEventRecurrenceDTO;
}
