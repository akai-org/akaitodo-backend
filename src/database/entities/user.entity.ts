import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    Admin = 'admin',
    User = 'user',
}

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    username: string;

    @Column({ length: 30, unique: true })
    email: string;

    @Column()
    hash: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.User,
    })
    role: UserRole;
}
