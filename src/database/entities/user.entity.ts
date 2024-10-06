import { UserRole } from 'src/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    username: string;

    @Column({ length: 30, unique: true })
    email: string;

    @Column({ nullable: true })
    hash?: string;

    @Column({ type: 'boolean', default: true })
    isLocal: boolean;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    constructor(
        id: number,
        username: string,
        email: string,
        hash: string | undefined,
        isLocal: boolean,
        role: UserRole,
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.hash = hash;
        this.isLocal = isLocal;
        this.role = role;
    }
}
