import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    username: string;

    @Column({ length: 30, unique: true })
    email: string;

    @Column()
    password: string;
}
