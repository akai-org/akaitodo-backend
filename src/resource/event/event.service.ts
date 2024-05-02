import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/database/entities/event.entity';
import { Repository } from 'typeorm';
import {
    CreateEventDTO,
    EditEventDTO,
    ReturnEventDTO,
} from 'src/resource/event/dto';
import { RecurrenceEntity } from '../../database/entities/recurrence.entity';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>,
        @InjectRepository(RecurrenceEntity)
        private readonly recurrenceRepository: Repository<RecurrenceEntity>,
    ) {}

    async getEventById(eventId: number): Promise<EventEntity> {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: { recurrencePattern: true },
        });
        if (!event) throw new NotFoundException('Event not found');
        return event;
    }

    async getEventsByUserId(userId: number): Promise<EventEntity[]> {
        return this.eventRepository.find({
            where: { createdById: userId },
            relations: { recurrencePattern: true },
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
