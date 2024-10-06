import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDTO {
    @ApiProperty()
    accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }
}
