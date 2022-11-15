import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.OAUTH_GOOGLE_ID,
            clientSecret: process.env.OAUTH_GOOGLE_SECRET,
            callbackURL: process.env.OAUTH_GOOGLE_REDIRECT,
            scope: ['email', 'profile', 'openid'],
        });
    }

    validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        const { displayName, emails, photos } = profile;
        console.log(profile);
        const user = {
            provider: 'google',
            nickname: displayName,
            email: emails[0].value,
            photos: photos[0].value,
            accessToken,
            refreshToken,
        };
        done(null, user);
    }
}
