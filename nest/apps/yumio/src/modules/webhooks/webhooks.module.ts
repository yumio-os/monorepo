import {
  forwardRef,
  Module,
} from '@nestjs/common';

import { ApiKeyDbModule } from '../../datasources/db/apiKey/apiKey.module';
import { PubSubModule } from '../../internal/pubSub/pubSub.module';
import { RedisClientModule } from '../../internal/redis/redisClient.module';
import { AuthModule } from '../auth/auth.module';
import { CacheModule } from '../cache/cache.module';
import { WebhooksController } from './controllers/webhooks';

@Module({
  imports: [
    forwardRef(() => RedisClientModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ApiKeyDbModule),
    forwardRef(() => CacheModule),
    forwardRef(() => PubSubModule),
  ],
  exports: [],
  controllers: [WebhooksController],
})
export class WebhooksModule {}
