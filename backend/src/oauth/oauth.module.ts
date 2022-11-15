import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entity/Users.entity';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './passport/google.strategy';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
        }),
        TypeOrmModule.forFeature([Users]),
    ],
    controllers: [OauthController],
    providers: [OauthService, GoogleStrategy, JwtStrategy],
})
export class OauthModule {}
