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
}
