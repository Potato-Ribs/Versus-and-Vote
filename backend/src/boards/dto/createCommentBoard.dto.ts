import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentBoardDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 2, description: '게시글 ID', required: true })
    boardId: number;

    @IsString()
    @ApiProperty({ example: '댓글댓글댓글', description: 'contents', required: true })
    contents: string;
}
