import { RecurrenceType } from 'src/types';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { EventEntity } from './event.entity';

@Entity({ name: 'recurrences' })
export class RecurrenceEntity {
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
    numberOfOccurrences?: number;

    @PrimaryColumn({ name: 'event_id' })
    eventId: number;

    @OneToOne(() => EventEntity, (event) => event.recurrencePattern, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'event_id' })
    event: EventEntity;
}
