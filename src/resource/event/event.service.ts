import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/database/entities/event.entity';
import { IsNull, Or, Raw, Repository } from 'typeorm';
import {
    CreateEventDTO,
    EditEventDTO,
    ReturnEventDTO,
} from 'src/resource/event/dto';
import { RecurrenceEntity } from '../../database/entities/recurrence.entity';
import { ReturnEventWithDatesDTO } from './dto/ReturnEventWithDates.dto';
import { RecurrenceType } from '../../types/enums';
import { addDays } from '../../utils/DateUtils';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>,
        @InjectRepository(RecurrenceEntity)
        private readonly recurrenceRepository: Repository<RecurrenceEntity>,
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
            relations: { recurrencePattern: true },
        });
    }

    async getEventsBetweenDates(
        userId: number,
        startDate: Date,
        endDate: Date,
    ): Promise<ReturnEventWithDatesDTO[]> {
        const toFilter = await this.eventRepository.find({
            where: {
                createdById: userId,
                startDate: Raw((alias) => `${alias} <= DATE ('${endDate}')`),
                endDate: Or(
                    IsNull(),
                    Raw((alias) => `${alias} >= DATE ('${startDate}')`),
                ),
            },
            relations: { recurrencePattern: true },
        });
        return toFilter.map((event) => {
            if (event.recurrencePattern == null) {
                return {
                    id: event.id,
                    name: event.name,
                    description: event.description,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    isFullDay: event.isFullDay,
                    createdById: event.createdById,
                    eventDates: [
                        new Date(event.startDate).toLocaleDateString(),
                    ],
                };
            }

            let start = new Date(event.startDate);
            start.setHours(0, 0, 0, 0);
            const toReturn: ReturnEventWithDatesDTO = {
                id: event.id,
                name: event.name,
                description: event.description,
                startDate: event.startDate,
                endDate: event.endDate,
                isFullDay: event.isFullDay,
                createdById: event.createdById,
                eventDates: [],
            };
            let freq = 24 * 60 * 60 * 1000;
            let freqInDays: number, shift: number;
            switch (event.recurrencePattern.recurrenceType) {
                case RecurrenceType.DAILY:
                    freqInDays = event.recurrencePattern.separationCount + 1;
                    if (start.getTime() < new Date(startDate).getTime()) {
                        freq = freq * freqInDays;
                        shift =
                            (new Date(startDate).getTime() - start.getTime()) %
                            freq;
                        start = new Date(
                            new Date(startDate).getTime() + freq - shift,
                        );
                    }
                    while (
                        start.getTime() <= new Date(endDate).getTime() &&
                        start.getTime() <= event.endDate.getTime()
                    ) {
                        toReturn.eventDates.push(start.toLocaleDateString());
                        start = addDays(start, freqInDays);
                    }
                    return toReturn;
                case RecurrenceType.WEEKLY:
                    freqInDays =
                        (event.recurrencePattern.separationCount + 1) * 7;
                    if (start.getTime() < new Date(startDate).getTime()) {
                        freq = freq * freqInDays;
                        shift =
                            (new Date(startDate).getTime() - start.getTime()) %
                            freq;
                        start = new Date(
                            new Date(startDate).getTime() + freq - shift,
                        );
                    }
                    while (
                        start.getTime() <= new Date(endDate).getTime() &&
                        start.getTime() <= event.endDate.getTime()
                    ) {
                        toReturn.eventDates.push(start.toLocaleDateString());
                        start = addDays(start, freqInDays);
                    }
                    return toReturn;
                case RecurrenceType.MONTHLY:
                    break;
                case RecurrenceType.YEARLY:
                    break;
            }
        });
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
