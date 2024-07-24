import { UserRole } from 'src/types/enums';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnUserDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    username: string;
    @ApiProperty()
    email: string;
    @ApiProperty({ enum: UserRole })
    role: UserRole;
}
