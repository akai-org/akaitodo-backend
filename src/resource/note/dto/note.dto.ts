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

    @IsString()
    @IsOptional()
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

    constructor(
        id: number,
        title: string,
        body: string,
        createdAt: Date | undefined,
        icon: string | undefined,
        color: string | undefined,
    ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.createdAt = createdAt;
        this.icon = icon;
        this.color = color;
    }
}
