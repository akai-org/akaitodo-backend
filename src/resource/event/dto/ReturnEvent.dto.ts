import { ReturnEventRecurrenceDTO } from './ReturnEventRecurrence.dto';

export class ReturnEventDTO {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isFullDay: boolean;
    createdById: number;
    recurrencePattern?: ReturnEventRecurrenceDTO;
}
