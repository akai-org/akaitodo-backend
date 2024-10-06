import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRole } from 'src/types';

export class ReturnUserDTO {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    username: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty({ enum: UserRole })
    @Expose()
    role: UserRole;

    constructor(id: number, username: string, email: string, role: UserRole) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
    }
}
