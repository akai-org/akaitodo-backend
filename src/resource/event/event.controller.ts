import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { EventService } from 'src/resource/event/event.service';
import { GetUser } from 'src/decorators';
import { CreateEventDTO, ReturnEventDTO } from 'src/resource/event/dto';
import { EditEventDTO } from 'src/resource/event/dto/EditEvent.dto';

@UseGuards(JwtGuard)
@Controller('events')
export class EventController {
    constructor(private eventService: EventService) {}

    @Get()
    getUserEvents(@GetUser('id') userId: number): Promise<ReturnEventDTO[]> {
        return this.eventService.getEventsByUserId(userId);
    }

    @Get(':id')
    getEventById(@Param('id') eventId: number): Promise<ReturnEventDTO> {
        return this.eventService.getEventById(eventId);
    }

    @Post()
    createEventByCurrentUser(
        @GetUser('id') userId: number,
        @Body() eventDto: CreateEventDTO,
    ): Promise<ReturnEventDTO> {
        return this.eventService.createEvent(userId, eventDto);
    }

    @Patch(':id')
    editEvent(
        @Param('id') eventId: number,
        @Body() editEventDto: EditEventDTO,
    ): Promise<ReturnEventDTO> {
        return this.eventService.editEventById(eventId, editEventDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteEvent(@Param('id') eventId: number): Promise<void> {
        return this.eventService.removeEventById(eventId);
    }
}
