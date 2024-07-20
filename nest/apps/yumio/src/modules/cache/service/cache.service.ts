import { createHash } from 'crypto';
import { Redis } from 'ioredis';

import {
  Injectable,
  Logger,
} from '@nestjs/common';

import {
  RedisService,
} from '../../../internal/redis/service/redisService.service';

@Injectable()
export class CacheService {
  private redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
  }

  async getWhenNotBlocked(siteId: number, key: string, inputObj: any) {
    let block, result;
    await Promise.allSettled([
      (async () => {
        block = await this.checkBlockCache(siteId);
      })(),
      (async () => {
        result = await this.returnCacheWithCache(siteId, key, inputObj);
      })(),
    ]);

    return { block, result: block ? null : result };
  }

  async checkBlockCache(siteId: number) {
    await this.redis.get(`cacheBlock:${siteId}`);
  }

  async setBlockCache(siteId: number, ttl = 12) {
    await this.redis.setex(`cacheBlock:${siteId}`, ttl, 1); // set the cache to 5s
  }

  async removeBlockCache(siteId: number) {
    await this.redis.del(`cacheBlock:${siteId}`); // set the cache to 5s
  }

  async returnCacheWithCache(stieId: number, key: string, inputObj: any) {
    try {
      return JSON.parse(
        await this.redis.getex(`cache:site:${stieId}:${key}:${this.tokeniseInput(inputObj)}`),
      );
    } catch (e) {
      return null;
    }
  }

  setCacheWithSite(siteId: number, key: string, inputObj: any, output: any, ttl = 10) {
    try {
      Logger.debug(`DEBUG HEAP::: seccond stringify`);
      this.redis
        .setex(
          `cache:site:${siteId}:${key}:${this.tokeniseInput(inputObj)}`,
          ttl,
          JSON.stringify(output),
        )
        .then()
        .catch((_) => Logger.error(`setCacheWithSite exception`, _));
    } catch (_) {
      //
    }
  }

  key(target, inputObj) {
    try {
      Logger.debug(`DEBUG HEAP::: third stringify`);
      return (
        `cache:${target}:` +
        createHash('sha256')
          .update(`${JSON.stringify(inputObj)}`)
          .digest('hex')
      );
    } catch (e) {
      return '';
    }
  }

  tokeniseInput(inputObj) {
    try {
      Logger.debug(`DEBUG HEAP::: fourth stringify`);
      return createHash('sha256')
        .update(`${JSON.stringify(inputObj)}`)
        .digest('hex');
    } catch (e) {
      return '';
    }
  }

  // -----------------------------------------------
  async invalidateSite(siteId: number) {
    await this.deleteKeysByPattern(`cache:site:${siteId}`);
    this.removeBlockCache(siteId);
  }

  async deleteKeysByPattern(pattern) {
    let cursor = '0';
    do {
      // Use the SCAN command to find keys by pattern
      const reply = await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      cursor = reply[0];
      const keys = reply[1];

      // Delete keys in batches
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } while (cursor !== '0');
  }
}
