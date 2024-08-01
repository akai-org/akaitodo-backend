import { RecurrenceType } from 'src/types';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
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

    @Column({ name: 'event_id', nullable: true })
    eventId: number;

    @OneToOne(() => EventEntity, (event) => event.recurrencePattern, {
        nullable: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'event_id' })
    event: EventEntity;
}
