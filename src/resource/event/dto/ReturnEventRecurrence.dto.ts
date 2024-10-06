import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { RecurrenceType } from 'src/types';

export class ReturnEventRecurrenceDTO {
    @ApiProperty()
    @Expose()
    recurrenceType: RecurrenceType;

    @ApiProperty()
    @Expose()
    separationCount: number;

    @ApiProperty()
    @Expose()
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
