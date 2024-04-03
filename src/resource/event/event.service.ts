import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/database/entities/event.entity';
import { Repository } from 'typeorm';
import {
    CreateEventDTO,
    EditEventDTO,
    ReturnEventDTO,
} from 'src/resource/event/dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private eventRepository: Repository<EventEntity>,
    ) {}

    async getEventById(eventId: number): Promise<EventEntity> {
        const event = await this.eventRepository.findOneBy({ id: eventId });
        if (!event) throw new NotFoundException('Event not found');
        return event;
    }

    async getEventsByUserId(userId: number): Promise<EventEntity[]> {
        return this.eventRepository.findBy({ createdById: userId });
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
        noteId: number,
        editEventDto: EditEventDTO,
    ): Promise<any> {
        const { affected } = await this.eventRepository.update(
            {
                id: noteId,
            },
            {
                ...editEventDto,
            },
        );
        if (affected == 0) throw new NotFoundException("Event doesn't exist");

        return await this.eventRepository.findOneBy({ id: noteId });
    }

    async removeEventById(eventId: number): Promise<void> {
        await this.eventRepository.delete({ id: eventId });
    }
}
