import { forwardRef, Module } from '@nestjs/common';

import { ApiKeyDbModule } from '../../datasources/db/apiKey/apiKey.module';
import { PubSubModule } from '../../internal/pubSub/pubSub.module';
import { RedisClientModule } from '../../internal/redis/redisClient.module';
import { AuthModule } from '../auth/auth.module';
import { CacheModule } from '../cache/cache.module';
import { CoreModule } from '../core/core.module';
import { OrderingPlatformResolver } from './resolvers/orderingPlatform.resolvers';

@Module({
  imports: [
    forwardRef(() => RedisClientModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ApiKeyDbModule),
    forwardRef(() => CacheModule),
    forwardRef(() => PubSubModule),
    forwardRef(() => CoreModule),
  ],
  exports: [OrderingPlatformResolver],
  providers: [OrderingPlatformResolver],
  controllers: [],
})
export class OrderingPlatformModule {}
