import Redis from 'ioredis';
import Stripe from 'stripe';

import { Inject, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';
import { safeIntParser } from '@yumio/common';
import { ApiKey } from '@yumio/modules/apiKey/model';

import { IContext } from '../../../common/model/context';
import { ApiKeyService } from '../../../datasources/db/apiKey/services/apiKey.service';
import { RedisService } from '../../../internal/redis/service/redisService.service';
import { StripeMapper } from '../mappers/stripeReader.mapper';

const tmpl = `kiosk`;

@Injectable()
export class AuthService {
  public redis: Redis; // workaround for guard errors for nest
  private readonly jwtSecret: string;
  private readonly jwtAccessExpiration: number;
  private readonly jwtRefreshExpiration: number;

  public apiKeyCacheTtl: number;

  constructor(
    @Inject(CONTEXT) private context: IContext,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    public apiKeyService: ApiKeyService, // workaround for guard errors for nest
  ) {
    this.redis = this.redisService.getClient();
    // this.jwtSecret = configService.get<IAppConfig>('app').AUTH.JWT_SECRET;
    // this.jwtAccessExpiration = configService.get<IAppConfig>('app').AUTH.JWT_ACCESS_EXPIRATION;
    // this.jwtRefreshExpiration = configService.get<IAppConfig>('app').AUTH.JWT_REFRESH_EXPIRATION;

    this.apiKeyCacheTtl = safeIntParser(
      // this.configService.get<IAppConfig>('app')?.AUTH?.API_KEY_CACHE,
      15 * 60,
      15 * 60,
    );
  }

  private applyCacheKeyTtl() {
    return this.apiKeyCacheTtl || 1;
  }

  public async getKioskTokenNonCached(apiKey: string) {
    return await this.apiKeyService.findOneByApiKey({}, apiKey);
  }

  public async getKioskToken(apiKey: string, deviceId?: string): Promise<ApiKey | null> {
    const redisKey = `api_key:${apiKey}`;
    const redisRef = this.redis;

    if (!apiKey) {
      return null;
    }

    const redisApiKey = await redisRef.get(redisKey);
    try {
      if (redisApiKey) {
        const obj = JSON.parse(redisApiKey);
        if (obj?.deviceId && obj.deviceId == deviceId) {
          return obj;
        }

        if (!obj?.deviceId) {
          return obj;
        }

        await redisRef.del(redisKey);
        Logger.log('API_KEY on Existing REdis key - do not match deviceID', {
          apiKey,
          deviceId,
        });

        return null;
      }
    } catch (e) {
      // check db
      Logger.error(`Error getKioskToken - redis`, e, {
        context: 'deregisterFirebaseKey - getKioskToken - redis',
      });
    }

    try {
      const dbApiKey = await this.apiKeyService.findOneByApiKey({}, apiKey);

      if (dbApiKey?.deviceId && deviceId != dbApiKey.deviceId) {
        Logger.log('API_KEY - do not match deviceID', { apiKey, deviceId });
        return null;
      }

      if (dbApiKey) {
        Logger.debug(`DEBUG HEAP::: First stringify`);
        await redisRef.setex(redisKey, this.applyCacheKeyTtl(), JSON.stringify(dbApiKey));
      }

      return dbApiKey;
    } catch (e) {
      Logger.error(`Error getKioskToken - db`, e, {
        context: 'deregisterFirebaseKey - getKioskToken - db',
      });

      return null;
    }
  }

  async replaceReader(apiKey: ApiKey, reader?: Stripe.Terminal.Reader) {
    const redisKey = `api_key:${apiKey.apiKey}`;
    const checkKey = await this.apiKeyService.findOneByApiKey({}, apiKey?.apiKey);

    if (reader) {
      checkKey.stripeTerminalId = reader.id;
      checkKey.readerInfo = StripeMapper.mapToReaderBase(reader);
    } else {
      checkKey.readerInfo = null;
      checkKey.stripeTerminalId = null;
    }

    await Promise.allSettled([await this.apiKeyService.save({}, checkKey), await this.redis.del(redisKey)]);

    return checkKey;
  }

  async lockApiKeyToDeviceId(apiKey: ApiKey, deviceId: string, reader?: Stripe.Terminal.Reader, siteId?: number): Promise<ApiKey> {
    if (!apiKey) {
      return null;
    }

    const redisKey = `api_key:${apiKey.apiKey}`;

    const checkKey = await this.apiKeyService.findOneByApiKey({}, apiKey?.apiKey);

    if (checkKey && deviceId && checkKey.deviceId == deviceId) {
      if (reader && reader.id != checkKey.stripeTerminalId) {
        checkKey.stripeTerminalId = reader.id;
        checkKey.readerInfo = StripeMapper.mapToReaderBase(reader);

        checkKey.deviceId = deviceId;
        checkKey.bindable = false;

        await Promise.allSettled([await this.apiKeyService.save({}, checkKey), await this.redis.del(redisKey)]);
      }

      return checkKey;
    }

    if (checkKey.deviceId) {
      return null;
    }

    if (!deviceId) {
      return null;
    }

    if (!checkKey.bindable) {
      return null;
    }

    if (reader) {
      checkKey.stripeTerminalId = reader.id;
      checkKey.readerInfo = StripeMapper.mapToReaderBase(reader);
    }

    if (siteId) {
      checkKey.serviceAreaIds = [siteId];
    }

    checkKey.deviceId = deviceId;
    checkKey.bindable = false;

    await Promise.allSettled([await this.apiKeyService.save({}, checkKey), await this.redis.del(redisKey)]);

    return checkKey;
  }
}
