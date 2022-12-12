import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCommentBoardDto {
    @IsString()
    @ApiProperty({ example: '댓글댓글댓글', description: 'contents', required: true })
    contents: string;
}
