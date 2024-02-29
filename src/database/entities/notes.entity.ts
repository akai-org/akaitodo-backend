import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notes' })
export class NotesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: 'Write here !' })
    body: string;

    @Column({ default: new Date() })
    createdAt: Date;

    @Column()
    Icon?: string;

    @Column()
    Color: string;
}
