import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { EventsService } from 'src/resource/events/events.service';
import { GetUser } from 'src/decorators';
import { EventEntity } from 'src/database/entities/event.entity';
import { CreateEventDto, ReturnEventDto } from 'src/resource/events/dto';
import { EditEventDto } from 'src/resource/events/dto/EditEvent.dto';

@UseGuards(JwtGuard)
@Controller('events')
export class EventsController {
    constructor(private eventService: EventsService) {}

    @Get()
    getCurrentUserEvents(
        @GetUser('id') userId: number,
    ): Promise<EventEntity[]> {
        return this.eventService.getNotesByUserId(userId);
    }

    @Post()
    createEventByUserId(
        @GetUser('id') userId: number,
        @Body() eventDto: CreateEventDto,
    ): Promise<ReturnEventDto> {
        return this.eventService.createEvent(userId, eventDto);
    }

    @Patch(':id')
    editEvent(
        @Param('id') noteId: number,
        @Body() editEventDto: EditEventDto,
    ): Promise<ReturnEventDto> {
        return this.eventService.editEventById(noteId, editEventDto);
    }
}
