import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RecurrenceType } from '../../types/enums';
import { EventEntity } from './event.entity';

@Entity({ name: 'recurrences' })
export class RecurrenceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'recurrence_type',
        type: 'enum',
        enum: RecurrenceType,
        default: RecurrenceType.DAILY,
    })
    recurrenceType: RecurrenceType;

    @Column({ name: 'separation_count', default: 0 })
    separationCount: number;

    @Column({ name: 'occurrence_count', nullable: true })
    numberOfOccurrences: number;

    @Column({ name: 'day_of_week', nullable: true })
    dayOfWeek: number;

    @Column({ name: 'day_of_month', nullable: true })
    dayOfMonth: number;

    @Column({ name: 'month_of_year', nullable: true })
    monthOfYear: number;

    @Column({ name: 'event_id', nullable: true })
    eventId: number;

    @OneToOne(() => EventEntity, (event) => event.recurrencePattern, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'event_id' })
    event: EventEntity;
}
