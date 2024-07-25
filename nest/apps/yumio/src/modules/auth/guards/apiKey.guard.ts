import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  handle401Error,
  handle403ApiKeySiteError,
} from '@yumio/common';

import {
  IContext,
  IContextSocket,
} from '../../../common/model/context';
import {
  ApiKeyService,
} from '../../../datasources/db/apiKey/services/apiKey.service';
import {
  RedisService,
} from '../../../internal/redis/service/redisService.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiKeyV2Guard implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
    // workaround for guard errors for nest,
    private apiKeyService: ApiKeyService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // ==================================================
    // very dirty way to resolve some of the nest issues
    // i will probably burn in hell for that

    // hacky way to work around nest js errors
    if (!this.authService.redis) {
      const redis = this.redisService.getClient();
      this.authService.redis = redis;
    }

    // hacky way to work around nest js errors
    if (!this.authService.apiKeyService) {
      this.authService.apiKeyService = this.apiKeyService;
    }
    // ==================================================

    const ctx = GqlExecutionContext.create(context);
    const tmpCtx = ctx.getContext();
    const localCtx = <IContext>tmpCtx.req?.webhookContext ? tmpCtx.req.webhookContext : tmpCtx;

    const deviceId = localCtx.deviceId || localCtx.userSessionId;

    if (!localCtx.apiKey) {
      if (tmpCtx?.req?.webhookContext) {
        Logger.error(`Failed API KEY express 401`, { deviceId, appiKey: localCtx?.apiKey });
        return false;
      }

      handle401Error();
    }

    try {
      const apiKey = await this.authService.getKioskToken(localCtx.apiKey, deviceId);
      localCtx.apiKeyDetails = apiKey;
    } catch (_) {
      localCtx.apiKeyDetails = null;
    }

    if (!localCtx.apiKeyDetails) {
      if (tmpCtx?.req?.webhookContext) {
        Logger.error(`Failed API KEY express 401`, { deviceId, appiKey: localCtx?.apiKey });
        return false;
      }
      handle401Error();
    }

    return true;
  }
}

@Injectable()
export class ApiKeyOrAuthGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
    // workaround for guard errors for nest,
    private apiKeyService: ApiKeyService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // ==================================================
    // very dirty way to resolve some of the nest issues
    // i will probably burn in hell for that

    // hacky way to work around nest js errors
    if (!this.authService.redis) {
      const redis = this.redisService.getClient();
      this.authService.redis = redis;
    }

    // hacky way to work around nest js errors
    if (!this.authService.apiKeyService) {
      this.authService.apiKeyService = this.apiKeyService;
    }
    // ==================================================

    const ctx = GqlExecutionContext.create(context);
    const tmpCtx = ctx.getContext();
    const localCtx = <IContext>tmpCtx.req?.webhookContext ? tmpCtx.req.webhookContext : tmpCtx;

    if (localCtx?.user?.id) {
      return true;
    }

    if (!localCtx.apiKey) {
      if (tmpCtx?.req?.webhookContext) {
        Logger.error(`Failed API KEY express 401`, {
          deviceId: localCtx?.deviceId,
          appiKey: localCtx?.apiKey,
        });
        return false;
      }
      handle401Error();
    }

    const deviceId = localCtx.deviceId || localCtx.userSessionId;

    try {
      const apiKey = await this.authService.getKioskToken(localCtx.apiKey, deviceId);
      localCtx.apiKeyDetails = apiKey;
    } catch (_) {
      localCtx.apiKeyDetails = null;
    }

    if (!localCtx.apiKeyDetails) {
      if (tmpCtx?.req?.webhookContext) {
        Logger.error(`Failed API KEY express 401`, {
          deviceId: localCtx?.deviceId,
          appiKey: localCtx?.apiKey,
        });
        return false;
      }
      handle401Error();
    }

    return true;
  }
}

@Injectable()
export class AuthGuardInfo implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
    // workaround for guard errors for nest,
    private apiKeyService: ApiKeyService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // ==================================================
    // very dirty way to resolve some of the nest issues
    // i will probably burn in hell for that

    // hacky way to work around nest js errors
    if (!this.authService.redis) {
      const redis = this.redisService.getClient();
      this.authService.redis = redis;
    }

    // hacky way to work around nest js errors
    if (!this.authService.apiKeyService) {
      this.authService.apiKeyService = this.apiKeyService;
    }
    // ==================================================

    const ctx = GqlExecutionContext.create(context);
    const tmpCtx = ctx.getContext();
    const localCtx = <IContext>tmpCtx.req?.webhookContext ? tmpCtx.req.webhookContext : tmpCtx;

    const deviceId = localCtx.deviceId || localCtx.userSessionId;

    try {
      const apiKey = await this.authService.getKioskToken(localCtx.apiKey, deviceId);
      localCtx.apiKeyDetails = apiKey;
    } catch (_) {
      localCtx.apiKeyDetails = null;
    }

    return true;
  }
}

export function blockIfNKeyNotInAreaThrow(
  context: IContext | IContextSocket,
  serviceAreaId: number,
  gqlException = false,
) {
  if (!serviceAreaId) {
    return false;
  }

  if (!context.apiKeyDetails) {
    return false;
  }

  if (!context.apiKeyDetails?.serviceAreaIds || context.apiKeyDetails.serviceAreaIds.length == 0) {
    return false;
  }

  if (!context.apiKeyDetails.serviceAreaIds.some((id) => id == serviceAreaId)) {
    if (gqlException == false) {
      throw Error(`This API Key can not be used in this site ${serviceAreaId}`);
    }

    handle403ApiKeySiteError();
  }
}
