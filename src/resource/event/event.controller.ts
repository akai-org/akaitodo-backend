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
    Query,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { EventService } from 'src/resource/event/event.service';
import { GetUser } from 'src/decorators';
import {
    CreateEventDTO,
    EditEventDTO,
    ReturnEventDTO,
} from 'src/resource/event/dto';
import { ReturnEventWithDatesDTO } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
    CreateEventByCurrentUserApi,
    DeleteEventApi,
    EditEventApi,
    GetEventByIdApi,
    GetUserEventsApi,
    GetUserEventsBetweenDatesApi,
} from '../../decorators/OpenAPI';

@UseGuards(JwtGuard)
@ApiTags('Events')
@Controller('events')
@ApiBearerAuth()
export class EventController {
    constructor(private eventService: EventService) {}

    @Get()
    @GetUserEventsApi()
    getUserEvents(@GetUser('id') userId: number): Promise<ReturnEventDTO[]> {
        return this.eventService.getEventsByUserId(userId);
    }

    @Get('dates')
    @GetUserEventsBetweenDatesApi()
    getUserEventsBetweenDates(
        @GetUser('id') userId: number,
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ): Promise<ReturnEventWithDatesDTO[]> {
        return this.eventService.getEventsBetweenDates(
            userId,
            startDate,
            endDate,
        );
    }

    @Get(':id')
    @GetEventByIdApi()
    getEventById(@Param('id') eventId: number): Promise<ReturnEventDTO> {
        return this.eventService.getEventById(eventId);
    }

    @Post()
    @CreateEventByCurrentUserApi()
    createEventByCurrentUser(
        @GetUser('id') userId: number,
        @Body() eventDto: CreateEventDTO,
    ): Promise<ReturnEventDTO> {
        return this.eventService.createEvent(userId, eventDto);
    }

    @Patch(':id')
    @EditEventApi()
    editEvent(
        @Param('id') eventId: number,
        @Body() editEventDto: EditEventDTO,
    ): Promise<ReturnEventDTO> {
        return this.eventService.editEventById(eventId, editEventDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    @DeleteEventApi()
    deleteEvent(@Param('id') eventId: number): Promise<void> {
        return this.eventService.removeEventById(eventId);
    }
}
