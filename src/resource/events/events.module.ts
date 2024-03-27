import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from '../../database/entities/event.entity';

@Module({
    controllers: [EventsController],
    providers: [EventsService],
    imports: [TypeOrmModule.forFeature([EventEntity])],
})
export class EventsModule {}
