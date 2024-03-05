import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ type: 'text'})
    name: string;

    @Column({ type: 'text'})
    description: string;

    @Column({ type: 'boolean', default: false })
    isDone: boolean;
}
