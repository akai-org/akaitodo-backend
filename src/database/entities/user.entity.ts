import { UserRole } from '../../types/enums';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NoteEntity } from './notes.entity';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    username: string;

    @Column({ length: 30, unique: true })
    email: string;

    @Column({ nullable: true })
    hash: string;

    @Column({ type: 'boolean', default: true })
    isLocal: boolean;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @OneToMany(() => NoteEntity, (note) => note.user)
    notes: NoteEntity[];
}
