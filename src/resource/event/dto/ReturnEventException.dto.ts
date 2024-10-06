import { ApiProperty } from '@nestjs/swagger';

export class ReturnEventExceptionDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    isRescheduled: boolean;
    @ApiProperty()
    isCancelled: boolean;
    @ApiProperty()
    originalDate: Date;
    @ApiProperty()
    startDate?: Date;
    @ApiProperty()
    endDate?: Date;
    @ApiProperty()
    isFullDay: boolean;
    @ApiProperty()
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
