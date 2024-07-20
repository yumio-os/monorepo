import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

import { IAppConfig } from '../../config/config.interface';
import { ReddisHealthIndicator } from './redis.health';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
    private configService: ConfigService,
    private redis: ReddisHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const config = this.configService.get<IAppConfig>('app');
    return this.health.check([
      // ping redis
      () => this.redis.isHealthy('redis'),

      // TODO
      // pg

      // check memory
      // leave the memory to ECS for now
      // () => this.memory.checkHeap('memory_heap', 1024 * 1024 * 1024), // 1024MB
    ]);
  }
}
