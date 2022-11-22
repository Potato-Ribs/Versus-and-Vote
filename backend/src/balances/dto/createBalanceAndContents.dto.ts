import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateBalanceAndContents {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'balance 게시글 제목', description: '아티클 제목', required: true })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '월200백수', description: 'left vs', required: true })
    left: string;

    @IsString()
    @ApiProperty({ example: '월500노예', description: 'vs right', required: true })
    right: string;
}
