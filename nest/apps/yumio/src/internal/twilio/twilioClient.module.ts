import { TwilioModule } from 'nestjs-twilio';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { IAppConfig } from '../../config/config.interface';

/** @todo TODO MOVE TO SHARED */
@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        accountSid: configService.get<IAppConfig>('app').TWILIO.ACCOUNT_SID,
        authToken: configService.get<IAppConfig>('app').TWILIO.AUTH_TOKEN,
      }),
      isGlobal: true,
      inject: [ConfigService],
    }),
  ],
})
export class TwilioClientModule {}
