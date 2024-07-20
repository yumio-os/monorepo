import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { ExecutionContext } from 'graphql/execution/execute';

import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';

import { IJWT } from '../../apollo.config';
import { IContext } from '../../common/model/context';

export function identityFromAuth(JWT): IJWT {
  try {
    const allNodes = JWT.split('.');
    const obj = <IJWT>JSON.parse(Buffer.from(`${allNodes[1]}`, 'base64').toString('utf-8'));
    return obj;
  } catch (_) {
    return {
      identity: {
        user: {
          id: 0,
        },
      },
    };
  }
}

@Injectable()
export class ContextFillMiddleware implements NestMiddleware {
  constructor(
    @Inject(CONTEXT) private context: IContext,
    @Inject(CONTEXT) private executionContext: ExecutionContext,
    @Inject(ConfigService) private config: ConfigService,
  ) {}

  // hooking up datasources for webhooks (when request go through middleware)
  use(req: Request, res: Response, next: NextFunction) {
    const jwt = req.headers['authorization']?.split?.(' ')[1];
    const userSessionId = String(req.headers['user_session_id'] ?? '');
    const deviceId = String(req.headers['device'] ?? '');
    const timeZone = String(req.headers['timezone'] ?? '');
    const serviceAreaId = Number(req.headers['service_area_id'] ?? 0);
    const siteId = Number(req.headers['site_id'] ?? 0) || serviceAreaId;
    const apiKey = String(req.headers['api-key'] ?? req.headers['api_key'] ?? '');
    const firebaseDeviceId = String(req.headers['device_id_firebase'] ?? '');
    const locale = <string>req.headers['locales'] ?? '';

    const webhookContext = <IContext>{
      id: randomUUID(),
      serviceAreaId,
      siteId,
      timeZone,
      mock: false,
      req,
      res,
      locale,
      // This is no done by the default guard
      user: { id: 0 },
      jwt,
      deviceId,
      firebaseDeviceId,
      userSessionId,
      apiKey,
    };

    (<any>req).webhookContext = webhookContext;

    next();
  }
}
