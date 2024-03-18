import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { VerifyCallback, Strategy } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(readonly configService: ConfigService) {
        super({
            clientID: configService.get('GOOGLE_ID'),
            clientSecret: configService.get('GOOGLE_SECRET'),
            callbackURL: configService.get('GOOGLE_CALLBACK'),
            scope: ['email', 'profile'],
        });
    }

    async validate(
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        console.log(profile);
        // const { displayName, email } = profile;
    }
}
