export class ReturnEventWithDatesDTO {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isFullDay: boolean;
    createdById: number;
    eventDates: string[];
}
