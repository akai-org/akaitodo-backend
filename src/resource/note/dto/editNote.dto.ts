import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class editNoteDTO {
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
