import { UserRole } from '../../../database/entities/user.entity';

export class ReturnUserDTO {
    id: number;
    username: string;
    email: string;
    role: UserRole;
}
