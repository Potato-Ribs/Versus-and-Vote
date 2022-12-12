import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, IsSurrogatePair } from 'class-validator';

export class ClickVoteDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: '투표 목록 id', required: true })
    voteListId: number;
}
