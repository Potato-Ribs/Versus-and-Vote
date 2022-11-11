import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('oauth 관련 API')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render('index')
    getHellos(@Res() res: Response) {
        const google = process.env.OAUTH_GOOGLE_URL as string;
        const kakao = process.env.OAUTH_KAKAO_URL as string;
        return {
            google: google,
            kakao: kakao,
        };
    }

    getHello() {
        return 'Hello world!';
    }
}
