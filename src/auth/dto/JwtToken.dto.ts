import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JwtTokenDTO {
    @ApiProperty()
    @Expose()
    accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
}
