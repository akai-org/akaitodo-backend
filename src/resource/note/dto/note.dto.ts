import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NoteDTO {
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    body: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    createdAt?: Date;

    @IsOptional()
    @ApiProperty({ required: false })
    icon?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    color?: string;
}
