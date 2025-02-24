import { Injectable } from '@nestjs/common';

import { SendgridService } from '../../../internal/sengrid/service/sengridService.service';

@Injectable()
export class EmailNotificationsService {
  constructor(private emailServiceProvider: SendgridService) {}

  // public sendOtp(to: string, otp: string, page?: string, role?: UserRoles) {
  //   return this.emailServiceProvider.sendOtp(to, otp, page, role);
  // }
}
