export interface IAppConfig {
  ACTIVE_PROFILE: string;
  DB: IDBConfig;
  REDIS: IRedisConfig;
  // AUTH: IAuthConfig;
  // CONSUMER_API: IConsumerApiConfig;
  // PUBSUB: IPubSubTopicsConfig;
  // PUBLISHER: IPublusherTopicsConfig;
  TWILIO: ITwilioConfig;
}


export interface ITwilioConfig {
  ACCOUNT_SID: string;
  AUTH_TOKEN: string;
}

export interface IRedisConfig {
  HOST: string;
  PORT: number;
  PASSWORD: string;
  NAMESPACE: string;
  DB: number;
}

// export interface IAuthConfig {
//   API_KEY_CACHE: number;
//   JWT_SECRET: string;
//   JWT_ACCESS_EXPIRATION: string;
//   JWT_REFRESH_EXPIRATION: string;
// }

export interface IDBConfig {
  HOSTNAME: string;
  TYPE: string;
  PORT: number;
  USERNAME: string;
  PASSWORD: string;
  DATABASE: string;
  SYNCHRONIZE: boolean;
  LOGGING: boolean;
}

// export interface IPubSubTopicsConfig {
//   PUBSUB_TRACKING: string;
//   PUBSUB_INSTOCK: string;
// }

// export interface IPublusherTopicsConfig {}
