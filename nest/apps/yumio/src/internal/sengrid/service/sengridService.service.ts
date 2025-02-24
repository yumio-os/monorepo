import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';

import { IAppConfig } from '../../../config/config.interface';

@Injectable()
export class SendgridService {
  private client: MailService;
  private config: IAppConfig;

  constructor(configService: ConfigService) {
    this.config = configService.get<IAppConfig>('app');
    this.client = require('@sendgrid/mail');
    this.client.setApiKey(this.config.SENDGRID.API_KEY);
  }

  // public async sendOtp(to: string, otp: string, page?: string, role?: UserRoles) {
  //   const msg = <MailDataRequired>{
  //     to,
  //     from: 'noreply@nvrwhr.net',
  //     templateId: this.config.SENDGRID.TMPL_OTP,
  //     dynamicTemplateData: {
  //       url: role == UserRoles.assessed ? this.config.APP.URL_ASSESSED : this.config.APP.URL_ASSESSOR,
  //       otp,
  //       ...(page && { page }),
  //     },
  //     attachments: <any>[],
  //   };

  //   try {
  //     await this.client.send(msg);
  //   } catch (error) {
  //     Logger.error(error);
  //     throw error;
  //   }
  // }
}
