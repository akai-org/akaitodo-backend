import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/database/entities/event.entity';
import { Repository } from 'typeorm';
import { CreateEventDto, ReturnEventDto } from 'src/resource/events/dto';
import { EditEventDto } from 'src/resource/events/dto/EditEvent.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity)
        private eventRepository: Repository<EventEntity>,
    ) {}

    async getNotesByUserId(userId: number): Promise<EventEntity[]> {
        return this.eventRepository.findBy({ creatorId: userId });
    }

    async createEvent(
        userId: number,
        eventDto: CreateEventDto,
    ): Promise<ReturnEventDto> {
        const event = this.eventRepository.create({
            ...eventDto,
            creatorId: userId,
        });
        return await this.eventRepository.save(event);
    }

    async editEventById(
        noteId: number,
        editEventDto: EditEventDto,
    ): Promise<any> {}
}
