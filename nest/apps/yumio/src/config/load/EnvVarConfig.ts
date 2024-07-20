import { Logger } from '@nestjs/common';

import {
  IAppConfig,
  IDBConfig,
  IRedisConfig,
} from '../config.interface';

export async function loadEnvVarConfig() {
  Logger.log(`Config loaded from ENV variables`, { context: 'ConfigLoader' });

  const appConfig = <IAppConfig>{};

  appConfig.ACTIVE_PROFILE = process.env.ACTIVE_PROFILE ?? 'local';

  // postgres
  appConfig.DB = <IDBConfig>{};
  appConfig.DB.HOSTNAME = process.env.DB_HOSTNAME ?? '';
  appConfig.DB.TYPE = process.env.DB_TYPE ?? '';
  appConfig.DB.PORT = Number(process.env.DB_PORT);
  appConfig.DB.USERNAME = process.env.DB_USERNAME ?? '';
  appConfig.DB.PASSWORD = process.env.DB_PASSWORD ?? '';
  appConfig.DB.DATABASE = process.env.DB_DATABASE ?? '';
  appConfig.DB.SYNCHRONIZE = (process.env.DB_SYNCHRONIZE ?? '') === 'true';
  appConfig.DB.LOGGING = (process.env.DB_LOGGING ?? '') === 'true';

  // auth
  // appConfig.AUTH = <IAuthConfig>{};
  // appConfig.AUTH.API_KEY_CACHE = Number(process.env.API_KEY_CACHE) ?? 15 * 60;
  // appConfig.AUTH.JWT_SECRET = process.env.AUTH_JWT_SECRET ?? '7c24788e-069b-584b-8220-62247abc23d6';
  // appConfig.AUTH.JWT_ACCESS_EXPIRATION = process.env.AUTH_JWT_ACCESS_EXPIRATIO ?? '60000';
  // appConfig.AUTH.JWT_REFRESH_EXPIRATION = process.env.AUTH_JWT_REFRESH_EXPIRATION ?? '2592000';

  // redis
  appConfig.REDIS = <IRedisConfig>{};
  appConfig.REDIS.HOST = process.env.REDIS_HOST ?? '';
  appConfig.REDIS.PORT = +process.env.REDIS_PORT ?? 6379;
  appConfig.REDIS.PASSWORD = process.env.REDIS_PASSWORD ?? '';
  appConfig.REDIS.NAMESPACE = process.env.REDIS_NAMESPACE ?? 'default';
  appConfig.REDIS.DB = +process.env.REDIS_DB ?? 0;


  // twilio
  // appConfig.TWILIO = <ITwilioConfig>{};
  // appConfig.TWILIO.ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID ?? '';
  // appConfig.TWILIO.AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN ?? '';

  // pubsub topics
  // appConfig.PUBSUB = <IPubSubTopicsConfig>{};
  // appConfig.PUBSUB.PUBSUB_TRACKING = process.env.PUBSUB_TRACKING ?? 'pubsub-tracking';
  // appConfig.PUBSUB.PUBSUB_INSTOCK = process.env.PUBSUB_INSTOCK ?? 'pubsub-instock';

  return { app: appConfig };
}
