import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/database/entities/event.entity';
import { Repository } from 'typeorm';
import {
    CreateEventDto,
    ReturnEventDto,
    EditEventDto,
} from 'src/resource/events/dto';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private eventRepository: Repository<EventEntity>,
    ) {}

    async getEventById(eventId: number): Promise<EventEntity> {
        const event = await this.eventRepository.findOneBy({ id: eventId });
        if (!event) throw new NotFoundException('Note not found');
        return event;
    }

    async getEventsByUserId(userId: number): Promise<EventEntity[]> {
        return this.eventRepository.findBy({ createdById: userId });
    }

    async createEvent(
        userId: number,
        eventDto: CreateEventDto,
    ): Promise<ReturnEventDto> {
        const event = this.eventRepository.create({
            ...eventDto,
            createdById: userId,
        });
        return await this.eventRepository.save(event);
    }

    async editEventById(
        noteId: number,
        editEventDto: EditEventDto,
    ): Promise<any> {
        const { affected } = await this.eventRepository.update(
            {
                id: noteId,
            },
            {
                ...editEventDto,
            },
        );
        if (affected == 0) throw new NotFoundException("Note doesn't exist");

        return await this.eventRepository.findOneBy({ id: noteId });
    }

    async removeEventById(eventId: number): Promise<void> {
        await this.eventRepository.delete({ id: eventId });
    }
}
