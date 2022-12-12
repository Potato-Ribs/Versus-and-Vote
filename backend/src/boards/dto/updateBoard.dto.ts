import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBoardDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 2, description: '토픽 ID', required: true })
    topicId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'titletitletitletitle&D', description: 'title', required: true })
    title: string;

    @IsString()
    @ApiProperty({ example: 'contentscontentscontentscontents', description: 'contents', required: true })
    contents: string;
}
