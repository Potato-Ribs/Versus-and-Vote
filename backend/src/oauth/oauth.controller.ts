import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OauthService } from './oauth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('oauth 관련 API')
@Controller('auth')
export class OauthController {
    constructor(private oauthService: OauthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async signWithGoogle(@Req() req) {}

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async signWithGoogleRedirect(@Req() req) {
        return await this.oauthService.signWithGoogle(req.user);
    }
}
