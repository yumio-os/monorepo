import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

import { RedisService } from '../redis/service/redisService.service';

@Injectable()
export class ReddisHealthIndicator extends HealthIndicator {
  constructor(
    private configService: ConfigService,
    private readonly redisService: RedisService,
  ) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const redis = this.redisService.getClient();
    const pong = await redis.ping();
    const isHealthy = pong === 'PONG';

    const result = this.getStatus(key, isHealthy);
    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Health check failed', result);
  }
}
