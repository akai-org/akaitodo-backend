import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserEntity } from 'src/database/entities/user.entity';
import { ReturnUserDTO } from 'src/resource/user/dto';

export class ReturnTaskDTO {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    description: string;

    @ApiProperty()
    @Expose()
    isDone: boolean;

    @ApiProperty({ type: () => UserEntity })
    @Type(() => ReturnUserDTO)
    user: ReturnUserDTO;
}
