import { Module } from '@nestjs/common';

import { SendgridClientModule } from '../../internal/sengrid/sengridClient.module';
import { EmailNotificationsService } from './service/emailNotifiction.service';

/** @todo TODO MOVE TO SHARED */
@Module({
  imports: [SendgridClientModule],
  providers: [EmailNotificationsService],
  exports: [EmailNotificationsService],
})
export class EmailNotificationstModule {}
