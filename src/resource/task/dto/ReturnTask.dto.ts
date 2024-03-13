import { UserEntity } from 'src/database/entities/user.entity';

export class ReturnTaskDTO {
    id: number;
    name: string;
    description: string;
    isDone: boolean;
    user: UserEntity;
}
