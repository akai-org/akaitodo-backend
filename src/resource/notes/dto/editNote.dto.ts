import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
}
