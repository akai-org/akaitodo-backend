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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorators';
import {
    CreateEventByCurrentUserApi,
    DeleteEventApi,
    EditEventApi,
    GetEventByIdApi,
    GetUserEventsApi,
    GetUserEventsBetweenDatesApi,
} from 'src/decorators/OpenAPI';
import {
    CreateEventDTO,
    EditEventDTO,
    ReturnEventDTO,
    ReturnEventWithDatesDTO,
} from 'src/resource/event/dto';
import { EventService } from 'src/resource/event/event.service';

@UseGuards(JwtGuard)
@ApiTags('Events')
@Controller('events')
@ApiBearerAuth()
export class EventController {
    constructor(private eventService: EventService) {}

    @Get()
    @GetUserEventsApi()
    async getUserEvents(
        @GetUser('id') userId: number,
    ): Promise<ReturnEventDTO[]> {
        return await this.eventService.getEventsByUserId(userId);
    }

    @Get('dates')
    @GetUserEventsBetweenDatesApi()
    async getUserEventsBetweenDates(
        @GetUser('id') userId: number,
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ): Promise<ReturnEventWithDatesDTO[]> {
        return await this.eventService.getEventsBetweenDates(
            userId,
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get(':id')
    @GetEventByIdApi()
    async getEventById(@Param('id') eventId: number): Promise<ReturnEventDTO> {
        return await this.eventService.getEventById(eventId);
    }

    @Post()
    @CreateEventByCurrentUserApi()
    async createEventByCurrentUser(
        @GetUser('id') userId: number,
        @Body() eventDto: CreateEventDTO,
    ): Promise<ReturnEventDTO> {
        return await this.eventService.createEvent(userId, eventDto);
    }

    @Patch(':id')
    @EditEventApi()
    async editEvent(
        @Param('id') eventId: number,
        @Body() editEventDto: EditEventDTO,
    ): Promise<ReturnEventDTO> {
        return await this.eventService.editEventById(eventId, editEventDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    @DeleteEventApi()
    async deleteEvent(@Param('id') eventId: number): Promise<void> {
        return await this.eventService.removeEventById(eventId);
    }
}
