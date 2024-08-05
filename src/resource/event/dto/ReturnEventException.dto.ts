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
}
