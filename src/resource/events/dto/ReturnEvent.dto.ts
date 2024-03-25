export class ReturnEventDto {
    id: number;
    name: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    startTime?: Date;
    endTime?: Date;
    isFullDay: boolean;
    creatorId: number;
}
