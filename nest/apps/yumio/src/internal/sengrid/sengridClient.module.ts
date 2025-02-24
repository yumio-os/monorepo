import { Module } from '@nestjs/common';

import { SendgridService } from './service/sengridService.service';

/** @todo TODO MOVE TO SHARED */
@Module({
  imports: [],
  providers: [SendgridService],
  exports: [SendgridService],
})
export class SendgridClientModule {}
