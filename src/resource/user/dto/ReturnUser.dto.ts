import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/types';

export class ReturnUserDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    email: string;
    @ApiProperty({ enum: UserRole })
    role: UserRole;

    constructor(id: number, username: string, email: string, role: UserRole) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}
