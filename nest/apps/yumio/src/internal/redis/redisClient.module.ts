import { Module } from '@nestjs/common';

import { RedisService } from './service/redisService.service';

/** @todo TODO MOVE TO SHARED */
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisClientModule {}
