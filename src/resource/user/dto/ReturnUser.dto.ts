import { UserRole } from 'src/types/enums';

export class ReturnUserDTO {
    id: number;
    username: string;
    email: string;
    role: UserRole;
}
