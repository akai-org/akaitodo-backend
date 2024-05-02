import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RecurrenceEntity } from './recurrence.entity';

@Entity({ name: 'events' })
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'New event' })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ name: 'start_date', type: 'datetime' })
    startDate: Date;

    @Column({ name: 'end_date', type: 'datetime', nullable: true })
    endDate: Date;

    @Column({ name: 'is_full_day', type: 'boolean' })
    isFullDay: boolean;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt: Date;

    @Column({ name: 'created_by_id' })
    createdById: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'created_by_id' })
    createdBy: UserEntity;

    @OneToOne(() => RecurrenceEntity, (recurrence) => recurrence.event, {
        cascade: true,
        nullable: true,
    })
    recurrencePattern: RecurrenceEntity;
}
