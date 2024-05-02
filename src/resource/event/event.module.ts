import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../../database/entities/event.entity';
import { RecurrenceEntity } from '../../database/entities/recurrence.entity';

@Module({
    controllers: [EventController],
    providers: [EventService],
    imports: [TypeOrmModule.forFeature([EventEntity, RecurrenceEntity])],
})
export class EventModule {}
