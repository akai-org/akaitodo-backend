import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'events' })
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'New event' })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ name: 'start_date', type: 'date' })
    startDate: Date;

    @Column({ name: 'end_date', type: 'date', nullable: true })
    endDate: Date;

    @Column({ name: 'start_time', type: 'time', nullable: true })
    startTime: Date;

    @Column({ name: 'end_time', type: 'time', nullable: true })
    endTime: Date;

    @Column({ name: 'is_full_day', type: 'boolean' })
    isFullDay: boolean;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt: Date;

    @Column({ nullable: false })
    creatorId: number;

    @ManyToOne(() => UserEntity, (user) => user.events)
    createdBy: UserEntity;
}
