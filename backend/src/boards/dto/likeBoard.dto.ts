import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LikeBoardDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 2, description: '게시글 ID', required: true })
    boardId: number;
}
