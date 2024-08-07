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
import {
    ApiBearerAuth,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorators';
import {
    AddEventExceptionApi,
    CreateEventByCurrentUserApi,
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
    ReturnEventDTO,
    ReturnEventExceptionDTO,
    ReturnEventWithDatesDTO,
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
    async getUserEvents(
        @GetUser('id') userId: number,
    ): Promise<ReturnEventDTO[]> {
        return await this.eventService.fetchUserEvents(userId);
    }

    @Get('dates')
    @GetUserEventsBetweenDatesApi()
    async getUserEventsBetweenDates(
        @GetUser('id') userId: number,
        @Query('startDate') startDate: Date,
        @Query('endDate') endDate: Date,
    ): Promise<ReturnEventWithDatesDTO[]> {
        return await this.eventService.fetchBetweenDates(
            userId,
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get(':id')
    @GetEventByIdApi()
    async getEventById(@Param('id') eventId: number): Promise<ReturnEventDTO> {
        return await this.eventService.fetchById(eventId);
    }

    @Get('except/:id')
    @GetEventExceptionByIdApi()
    async getEventExceptionById(
        @Param('id') exceptionId: number,
    ): Promise<ReturnEventExceptionDTO> {
        return await this.eventService.fetchExceptionById(exceptionId);
    }

    @Post()
    @CreateEventByCurrentUserApi()
    async createEventByCurrentUser(
        @GetUser('id') userId: number,
        @Body() eventDto: CreateEventDTO,
    ): Promise<ReturnEventDTO> {
        return await this.eventService.createEvent(userId, eventDto);
    }

    @Post('exceptions/:id')
    @AddEventExceptionApi()
    async addEventException(
        @Param('id') eventId: number,
        @Body() exceptionDto: CreateEventExceptionDTO,
    ): Promise<ReturnEventExceptionDTO> {
        return await this.eventService.createException(eventId, exceptionDto);
    }

    @Patch(':id')
    @EditEventApi()
    async editEvent(
        @Param('id') eventId: number,
        @Body() editEventDto: EditEventDTO,
    ): Promise<ReturnEventDTO> {
        return await this.eventService.editById(eventId, editEventDto);
    }

    @Patch('exceptions/:id')
    @EditExceptionApi()
    async editException(
        @Param('id') exceptionId: number,
        @Body() editExceptionDto: EditEventExceptionDTO,
    ): Promise<ReturnEventExceptionDTO> {
        return await this.eventService.editExceptionById(
            exceptionId,
            editExceptionDto,
        );
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    @DeleteEventApi()
    async deleteEvent(@Param('id') eventId: number): Promise<void> {
        await this.eventService.deleteById(eventId);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('exceptions/:id')
    @DeleteExceptionApi()
    async deleteException(@Param('id') exceptionId: number): Promise<void> {
        await this.eventService.removeExceptionById(exceptionId);
    }
}
