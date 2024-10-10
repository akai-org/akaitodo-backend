import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReturnEventExceptionDTO {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    isRescheduled: boolean;

    @ApiProperty()
    @Expose()
    isCancelled: boolean;

    @ApiProperty()
    @Expose()
    originalDate: Date;

    @ApiProperty()
    @Expose()
    startDate?: Date;

    @ApiProperty()
    @Expose()
    endDate?: Date;

    @ApiProperty()
    @Expose()
    isFullDay: boolean;

    @ApiProperty()
    @Expose()
    mainEventId: number;
}
