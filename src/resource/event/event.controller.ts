import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorators';
import {
    AddEventApi,
    AddEventExceptionApi,
    DeleteEventApi,
    DeleteExceptionApi,
    EditEventApi,
    EditExceptionApi,
    GetEventByIdApi,
    GetEventExceptionByIdApi,
    GetUserEventsApi,
    GetUserEventsBetweenDatesApi,
} from 'src/decorators/OpenAPI';
import {
    CreateEventDTO,
    CreateEventExceptionDTO,
    EditEventDTO,
    EditEventExceptionDTO,
} from 'src/resource/event/dto';
import { EventService } from 'src/resource/event/event.service';

@UseGuards(JwtGuard)
@ApiTags('Events')
@Controller('events')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class EventController {
    constructor(private eventService: EventService) {}

    @Get()
    @GetUserEventsApi()
    async getUserEvents(@GetUser('id') userId: number) {
        return await this.eventService.fetchByUser(userId);
    }

    @Get('dates')
    @GetUserEventsBetweenDatesApi()
    async getUserEventsBetweenDates(
        @GetUser('id') userId: number,
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ) {
        return await this.eventService.fetchBetweenDates(
            userId,
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get(':id')
    @GetEventByIdApi()
    async getEventById(@Param('id') eventId: number) {
        const event = await this.eventService.fetchById(eventId);
        if (!event) throw new NotFoundException('Event not found');
        return event;
    }

    @Get('except/:id')
    @GetEventExceptionByIdApi()
    async getEventExceptionById(@Param('id') exceptionId: number) {
        const exception =
            await this.eventService.fetchExceptionById(exceptionId);
        if (!exception) throw new NotFoundException('Exception not found');
        return exception;
    }

    @Post()
    @AddEventApi()
    async addEvent(
        @GetUser('id') userId: number,
        @Body() eventDto: CreateEventDTO,
    ) {
        return await this.eventService.add(userId, eventDto);
    }

    @Post('exceptions/:id')
    @AddEventExceptionApi()
    async addEventException(
        @Param('id') eventId: number,
        @Body() exceptionDto: CreateEventExceptionDTO,
    ) {
        return await this.eventService.addException(eventId, exceptionDto);
    }

    @Patch(':id')
    @EditEventApi()
    async editEvent(
        @Param('id') eventId: number,
        @Body() editEventDto: EditEventDTO,
    ) {
        const updatedEvent = await this.eventService.edit(
            eventId,
            editEventDto,
        );
        if (!updatedEvent) throw new NotFoundException('Event not found');
        return updatedEvent;
    }

    @Patch('exceptions/:id')
    @EditExceptionApi()
    async editException(
        @Param('id') exceptionId: number,
        @Body() editExceptionDto: EditEventExceptionDTO,
    ) {
        const editedException = await this.eventService.editException(
            exceptionId,
            editExceptionDto,
        );
        if (!editedException)
            throw new NotFoundException('Exception not found');
        return editedException;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    @DeleteEventApi()
    async deleteEvent(@Param('id') eventId: number) {
        await this.eventService.delete(eventId);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('exceptions/:id')
    @DeleteExceptionApi()
    async deleteException(@Param('id') exceptionId: number) {
        await this.eventService.deleteException(exceptionId);
    }
}
