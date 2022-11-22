import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ClickBalanceLike {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 2, description: '밸런스 게시글 id', required: true })
    balanceId: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'Love', required: true })
    categoryId: number;
}
