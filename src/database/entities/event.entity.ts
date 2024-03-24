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

    @Column({ default: 'New event', nullable: false })
    name: string;

    @Column()
    description: string;

    @Column({ name: 'start_date', type: 'date', nullable: false })
    startDate: Date;

    @Column({ name: 'end_date', type: 'date' })
    endDate: Date;

    @Column({ name: 'start_time', type: 'time' })
    startTime: Date;

    @Column({ name: 'end_time', type: 'time' })
    endTime: Date;

    @Column({ name: 'is_full_day', type: 'boolean' })
    isFullDay: boolean;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.events)
    createdBy: UserEntity;
}
