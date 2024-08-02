import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/database/entities/event.entity';
import { EventExceptionEntity } from 'src/database/entities/event.exception.entity';
import { RecurrenceEntity } from 'src/database/entities/recurrence.entity';
import {
    CreateEventDTO,
    EditEventDTO,
    ReturnEventDTO,
    ReturnEventExceptionDTO,
    ReturnEventWithDatesDTO,
} from 'src/resource/event/dto';
import { RecurrenceType } from 'src/types';
import { addDays, nextMonthWithDate } from 'src/utils';
import { IsNull, Or, Raw, Repository } from 'typeorm';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>,
        @InjectRepository(RecurrenceEntity)
        private readonly recurrenceRepository: Repository<RecurrenceEntity>,
        @InjectRepository(EventExceptionEntity)
        private readonly exceptionRepository: Repository<EventExceptionEntity>,
    ) {}

    async getEventById(eventId: number): Promise<ReturnEventDTO> {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: { recurrencePattern: true },
        });
        if (!event) throw new NotFoundException('Event not found');
        return event;
    }

    async getEventsByUserId(userId: number): Promise<ReturnEventDTO[]> {
        return this.eventRepository.find({
            where: { createdById: userId },
            relations: { recurrencePattern: true, eventExceptions: true },
        });
    }

    async getEventsBetweenDates(
        userId: number,
        startDate: Date,
        endDate: Date,
    ): Promise<ReturnEventWithDatesDTO[]> {
        // const toFilter = await this.eventRepository.find({
        //     where: {
        //         createdById: userId,
        //         startDate: Raw((alias) => `${alias} <= DATE ('${endDate}')`),
        //         endDate: Or(
        //             IsNull(),
        //             Raw((alias) => `${alias} >= DATE ('${startDate}')`),
        //         ),
        //         eventExceptions: {
        //             startDate: Or(
        //                 IsNull(),
        //                 Raw((alias) => `${alias} <= DATE ('${endDate}')`),
        //             ),
        //             endDate: Or(
        //                 IsNull(),
        //                 Raw((alias) => `${alias} >= DATE ('${startDate}')`),
        //             ),
        //         },
        //     },
        //     relations: { recurrencePattern: true, eventExceptions: true },
        // });
        const toFilter = await this.eventRepository.find({
            where: {
                createdById: userId,
                startDate: Raw(
                    (alias) => `${alias} <= DATE ('${endDate.toISOString()})')`,
                ),
                endDate: Or(
                    IsNull(),
                    Raw(
                        (alias) =>
                            `${alias} >= DATE ('${startDate.toISOString()}')`,
                    ),
                ),
            },
            relations: { recurrencePattern: true, eventExceptions: true },
        });

        return toFilter.reduce(
            (filtered: ReturnEventWithDatesDTO[], event: EventEntity) => {
                const toReturn: ReturnEventWithDatesDTO = {
                    id: event.id,
                    name: event.name,
                    description: event.description,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    isFullDay: event.isFullDay,
                    createdById: event.createdById,
                    eventDates: [],
                    eventExceptions: [],
                };

                if (event.eventExceptions != null) {
                    event.eventExceptions.forEach((exception) => {
                        const rescheduledConditions =
                            exception.isRescheduled == true &&
                            exception.startDate <= endDate &&
                            (exception.endDate == null ||
                                exception.endDate >= startDate);
                        const cancelledConditions =
                            exception.isCancelled == true &&
                            exception.originalDate <= endDate;
                        // const exceptionConditions =
                        //     exception.startDate <= endDate &&
                        //     (exception.endDate == null ||
                        //         exception.endDate >= startDate);
                        if (rescheduledConditions || cancelledConditions) {
                            toReturn.eventExceptions.push(exception);
                        }
                    });
                }

                if (event.recurrencePattern == null) {
                    toReturn.eventDates.push(
                        new Date(event.startDate).toLocaleDateString(),
                    );
                    filtered.push(toReturn);
                    return filtered;
                }

                let start = new Date(event.startDate);
                start.setHours(0, 0, 0, 0);
                const endFilter: number = event.endDate
                    ? Math.min(endDate.getTime(), event.endDate.getTime())
                    : endDate.getTime();
                const eventRecurrence = event.recurrencePattern.recurrenceType;
                const eventSeparation = event.recurrencePattern.separationCount;
                let eventCount =
                    event.recurrencePattern.numberOfOccurrences ??
                    Number.MAX_SAFE_INTEGER;
                const exceptionDates: string[] =
                    event.eventExceptions?.map((e) =>
                        e.originalDate.toLocaleDateString(),
                    ) ?? [];

                if (
                    eventRecurrence == RecurrenceType.DAILY ||
                    eventRecurrence == RecurrenceType.WEEKLY
                ) {
                    const freqInDays =
                        eventRecurrence == RecurrenceType.WEEKLY
                            ? (eventSeparation + 1) * 7
                            : eventSeparation + 1;
                    if (start.getTime() < startDate.getTime()) {
                        const freq = 24 * 60 * 60 * 1000 * freqInDays;
                        const shift =
                            (startDate.getTime() - start.getTime()) % freq;
                        start = new Date(startDate.getTime() + freq - shift);
                    }
                    while (start.getTime() <= endFilter && eventCount-- > 0) {
                        if (
                            !exceptionDates.includes(start.toLocaleDateString())
                        )
                            toReturn.eventDates.push(
                                start.toLocaleDateString(),
                            );
                        start = addDays(start, freqInDays);
                    }
                    if (toReturn.eventDates.length > 0) filtered.push(toReturn);
                } else {
                    const toAdd =
                        eventRecurrence == RecurrenceType.YEARLY
                            ? (eventSeparation + 1) * 12
                            : eventSeparation + 1;
                    while (start.getTime() < startDate.getTime()) {
                        start = nextMonthWithDate(start, toAdd);
                    }
                    while (start.getTime() <= endFilter && eventCount-- > 0) {
                        if (
                            !exceptionDates.includes(start.toLocaleDateString())
                        )
                            toReturn.eventDates.push(
                                start.toLocaleDateString(),
                            );
                        start = nextMonthWithDate(start, toAdd);
                    }
                    if (toReturn.eventDates.length > 0) filtered.push(toReturn);
                }

                return filtered;
            },
            [],
        );
    }

    async getExceptionById(
        exceptionId: number,
    ): Promise<ReturnEventExceptionDTO> {
        const exception = await this.exceptionRepository.findOneBy({
            id: exceptionId,
        });
        if (!exception) throw new NotFoundException('Exception not found');
        return exception;
    }

    async createEvent(
        userId: number,
        eventDto: CreateEventDTO,
    ): Promise<ReturnEventDTO> {
        const event = this.eventRepository.create({
            ...eventDto,
            createdById: userId,
        });
        return await this.eventRepository.save(event);
    }

    async editEventById(
        eventId: number,
        editEventDto: EditEventDTO,
    ): Promise<ReturnEventDTO> {
        const eventToUpdate = await this.eventRepository.findOne({
            where: { id: eventId },
        });
        if (!eventToUpdate) throw new NotFoundException('Event not found');

        if (editEventDto.deleteRecurrence) {
            await this.recurrenceRepository.delete({ eventId });
        }
        delete editEventDto.deleteRecurrence;

        this.eventRepository.merge(eventToUpdate, editEventDto);
        await this.eventRepository.save(eventToUpdate);

        return eventToUpdate;
    }

    async removeEventById(eventId: number): Promise<void> {
        await this.eventRepository.delete({ id: eventId });
    }
}
