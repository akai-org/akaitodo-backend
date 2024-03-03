import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notes' })
export class NotesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'Title !' })
    title: string;

    @Column({ default: 'Write something here! ' })
    body: string;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
    createdAt?: Date;

    @Column({ default: 0 })
    timezoneOffset: number;

    @Column({ nullable: true })
    Icon?: string;

    @Column({ default: 'red' })
    Color: string;
}
