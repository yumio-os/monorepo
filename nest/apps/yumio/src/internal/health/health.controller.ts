import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IAppConfig } from '../../config/config.interface';
import { ReddisHealthIndicator } from './redis.health';

@Controller('health')
export class HealthController {
  constructor(
    private configService: ConfigService,
    private redis: ReddisHealthIndicator,
  ) {}

  @Get()
  async check() {
    const config = this.configService.get<IAppConfig>('app');

    const checks = {};
    const fails = {};
    const status: { info: any; error: any; details: any } = {
      info: {},
      error: {},
      details: {},
    };

    // Perform health checks
    await Promise.allSettled([
      (async () => {
        try {
          await this.redis.isHealthy('redis');
          status.info['redis'] = { status: 'up' };
          status.details['redis'] = { status: 'up' };
        } catch (err) {
          status.error['redis'] = { status: 'down', message: err.message };
          status.details['redis'] = { status: 'down', message: err.message };
        }
      })(),
      // (async () => { /* PG Check - TODO */ })(),
      // (async () => { /* Memory Check - TODO */ })(),
    ]);

    // Final status based on the checks
    const globalStatus = Object.keys(status.error).length === 0 ? 'ok' : 'error';

    // If there are any errors, throw an exception with 503 status
    if (globalStatus === 'error') {
      throw new HttpException(
        {
          status: 'error',
          info: status.info,
          error: status.error,
          details: status.details,
        },
        HttpStatus.SERVICE_UNAVAILABLE, // Return 503 Service Unavailable
      );
    }

    // Return health check result
    return {
      status: globalStatus,
      info: status.info,
      error: status.error,
      details: status.details,
    };
  }
}
