import { RecurrenceType } from '../../../types/enums';

export class ReturnEventRecurrenceDTO {
    recurrenceType: RecurrenceType;
    separationCount: number;
    numberOfOccurrences: number;
    dayOfWeek: number;
    dayOfMonth: number;
    monthOfYear: number;
}
