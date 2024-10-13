import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RedisClientModule } from '../redis/redisClient.module';
import { HealthController } from './health.controller';
import { ReddisHealthIndicator } from './redis.health';

@Module({
  imports: [HttpModule, ConfigModule, RedisClientModule],
  providers: [ReddisHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
