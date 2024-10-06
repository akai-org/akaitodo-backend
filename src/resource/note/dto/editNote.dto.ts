import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class editNoteDTO {
    id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    body?: string;

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

    constructor(
        id: number,
        title: string,
        body: string,
        createdAt: Date,
        icon: string,
        color: string,
    ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.createdAt = createdAt;
        this.icon = icon;
        this.color = color;
    }
}
