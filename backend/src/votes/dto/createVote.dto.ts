import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, IsSurrogatePair } from 'class-validator';

export class CreateVoteDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '라면 인기투표', description: '투표 게시글 제목', required: true })
    voteTitle: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ example: ['신라면', '진라면매운맛', '진순이'], description: '투표 리스트', required: true })
    voteListTitle: [];

    @IsString()
    @ApiProperty({ example: '음식', description: '카테고리 이름', required: true })
    category: string;
}
