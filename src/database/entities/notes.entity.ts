import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'notes' })
export class NoteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'Title' })
    title: string;

    @Column({ default: 'Write something here!' })
    body: string;

    @Column({ type: 'timestamp', default: () => 'NOW()' })
    createdAt?: Date;

    @Column({ nullable: true })
    icon?: string;

    @Column({ default: 'red' })
    color: string;

    @ManyToOne(() => UserEntity)
    user: UserEntity;

    constructor(
        id: number,
        title: string,
        body: string,
        createdAt: Date,
        icon: string,
        color: string,
        user: UserEntity,
    ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.createdAt = createdAt;
        this.icon = icon;
        this.color = color;
        this.user = user;
    }
}
