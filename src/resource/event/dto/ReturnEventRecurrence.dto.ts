import { ApiProperty } from '@nestjs/swagger';
import { RecurrenceType } from 'src/types';

export class ReturnEventRecurrenceDTO {
    @ApiProperty()
    recurrenceType: RecurrenceType;
    @ApiProperty()
    separationCount: number;
    @ApiProperty()
    numberOfOccurrences?: number;

    constructor(
        recurrenceType: RecurrenceType,
        separationCount: number,
        numberOfOccurrences: number | undefined,
    ) {
        this.recurrenceType = recurrenceType;
        this.separationCount = separationCount;
        this.numberOfOccurrences = numberOfOccurrences;
    }
}
