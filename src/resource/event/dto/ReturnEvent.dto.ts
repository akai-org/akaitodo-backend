import { ReturnEventRecurrenceDTO } from './ReturnEventRecurrence.dto';

import { ApiProperty } from '@nestjs/swagger';

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
    recurrencePattern?: ReturnEventRecurrenceDTO;
}
