import { UserEntity } from 'src/database/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnTaskDTO {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    isDone: boolean;
    @ApiProperty({ type: () => UserEntity })
    user: UserEntity;
}
