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

    constructor(
        id: number,
        isRescheduled: boolean,
        isCancelled: boolean,
        originalDate: Date,
        startDate: Date | undefined,
        endDate: Date | undefined,
        isFullDay: boolean,
        mainEventId: number,
    ) {
        this.id = id;
        this.isRescheduled = isRescheduled;
        this.isCancelled = isCancelled;
        this.originalDate = originalDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isFullDay = isFullDay;
        this.mainEventId = mainEventId;
    }
}
