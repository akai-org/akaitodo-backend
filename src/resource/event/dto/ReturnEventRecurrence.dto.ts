import { RecurrenceType } from '../../../types';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnEventRecurrenceDTO {
    @ApiProperty()
    recurrenceType: RecurrenceType;
    @ApiProperty()
    separationCount: number;
    @ApiProperty()
    numberOfOccurrences: number;
    @ApiProperty()
    dayOfWeek: number;
    @ApiProperty()
    dayOfMonth: number;
    @ApiProperty()
    monthOfYear: number;
}
