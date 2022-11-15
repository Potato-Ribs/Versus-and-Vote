import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @Matches(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    @ApiProperty({ description: 'email' })
    readonly email: string;

    @IsString()
    @ApiProperty({ description: '사진 url' })
    readonly photo: string;

    @IsString()
    @ApiProperty({ description: '닉네임' })
    readonly nickname: string;

    @IsString()
    @ApiProperty({ description: 'google OAuth Authorization' })
    readonly accessToken: string;
}
