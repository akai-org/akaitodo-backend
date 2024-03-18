import { OAuth2Client } from 'google-auth-library';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleClient extends OAuth2Client {
    constructor(readonly configService: ConfigService) {
        super(
            configService.get('GOOGLE_ID'),
            configService.get('GOOGLE_SECRET'),
        );
    }
}
