import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/database/entities/user.entity';

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

    constructor(
        id: number,
        name: string,
        description: string,
        isDone: boolean,
        user: UserEntity,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.isDone = isDone;
        this.user = user;
    }
}
