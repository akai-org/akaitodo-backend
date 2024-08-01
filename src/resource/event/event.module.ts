import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/database/entities/event.entity';
import { EventExceptionEntity } from 'src/database/entities/event.exception.entity';
import { RecurrenceEntity } from 'src/database/entities/recurrence.entity';
import { EventController } from 'src/resource/event/event.controller';
import { EventService } from 'src/resource/event/event.service';

@Module({
    controllers: [EventController],
    providers: [EventService],
    imports: [
        TypeOrmModule.forFeature([
            EventEntity,
            RecurrenceEntity,
            EventExceptionEntity,
        ]),
    ],
})
export class EventModule {}
