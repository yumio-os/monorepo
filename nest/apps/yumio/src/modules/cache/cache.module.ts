import { Module } from '@nestjs/common';

import { RedisClientModule } from '../../internal/redis/redisClient.module';
import { CacheService } from './service/cache.service';

@Module({
  imports: [RedisClientModule],
  exports: [CacheService],
  controllers: [],
  providers: [CacheService],
})
export class CacheModule {}
