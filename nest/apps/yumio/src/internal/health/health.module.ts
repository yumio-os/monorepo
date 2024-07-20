import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { ConfigModule } from '@nestjs/config';
import { RedisClientModule } from '../redis/redisClient.module';
import { ReddisHealthIndicator } from './redis.health';

@Module({
  imports: [TerminusModule, HttpModule, ConfigModule, RedisClientModule],
  providers: [ReddisHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
