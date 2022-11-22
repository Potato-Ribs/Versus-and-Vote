import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ClickBalance {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: '좌/우 id', required: true })
    balanceContentsId: number;
}
