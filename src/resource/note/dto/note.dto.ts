import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class NoteDTO {
    @ApiProperty()
    @Expose()
    id: number;

    @IsString()
    @ApiProperty()
    @Expose()
    title: string;

    @IsString()
    @ApiProperty()
    @Expose()
    body: string;

    @ApiProperty({ required: false })
    @Expose()
    createdAt?: Date;

    @IsOptional()
    @ApiProperty({ required: false })
    @Expose()
    icon?: string;

    @IsOptional()
    @ApiProperty({ required: false })
    @Expose()
    color?: string;
}
