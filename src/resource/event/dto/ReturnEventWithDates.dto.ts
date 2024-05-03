export class ReturnEventWithDatesDTO {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    isFullDay: boolean;
    createdById: number;
    eventDates: string[];
}
