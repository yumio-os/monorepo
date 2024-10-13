import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RedisService } from '../redis/service/redisService.service';

@Injectable()
export class ReddisHealthIndicator {
  constructor(
    private configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async isHealthy(key: string): Promise<Boolean> {
    const redis = this.redisService.getClient();
    const pong = await redis.ping();
    const isHealthy = pong === 'PONG';

    if (isHealthy) {
      return isHealthy;
    }
    throw new Error('Health check failed');
  }
}
