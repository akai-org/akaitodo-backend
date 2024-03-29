export class ReturnEventDto {
    id: number;
    name: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    isFullDay: boolean;
    creatorId: number;
}
