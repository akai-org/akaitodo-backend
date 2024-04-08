import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity({ name: 'event_exception' })
export class EventExceptionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'is_rescheduled', type: 'boolean' })
    isRescheduled: boolean;

    @Column({ name: 'is_cancelled', type: 'boolean' })
    isCancelled: boolean;

    @Column({ name: 'start_date', type: 'datetime' })
    startDate: Date;

    @Column({ nullable: true, name: 'end_date', type: 'datetime' })
    endDate: Date;

    @Column({ name: 'is_full_day', type: 'boolean' })
    isFullDay: boolean;

    @Column({ name: 'event_id' })
    mainEventId: number;

    @ManyToOne(() => EventEntity)
    @JoinColumn({ name: 'event_id' })
    mainEvent: EventEntity;
}
