import { randomUUID } from 'crypto';
import { Context } from 'graphql-ws';
import { join } from 'path';

import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import {
  ApolloDriver,
  ApolloDriverConfig,
} from '@nestjs/apollo';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  IContextHttp,
  IContextSocket,
} from './common/model/context';
import { LoggingPlugin } from './internal/apollo/LoggingPlugin';
import { ComplexityPlugin } from './internal/complexity/complexityPlugin';

const isProd = process.env.ACTIVE_PROFILE == 'production' || process.env.ACTIVE_PROFILE == 'prod';
const plugins = [];
plugins.push(new LoggingPlugin());
plugins.push(new ComplexityPlugin());

let relicPlugin;
if (process.env.NEW_RELIC_APP_NAME && process.env.NEW_RELIC_LICENSE_KEY) {
  relicPlugin = require('@newrelic/apollo-server-plugin');
  plugins.push(relicPlugin);
}

if (isProd) {
  plugins.push(ApolloServerPluginLandingPageProductionDefault());
} else {
  plugins.push(ApolloServerPluginLandingPageLocalDefault());
}

export const apolloConfigFactory = async (configService: ConfigService) =>
  <ApolloDriverConfig>{
    driver: ApolloDriver,
    cors: {
      origin: '*',
      credentials: true,
    },
    headers: {
      'Content-Security-Policy':
        "default-src 'self' https://embeddable-sandbox.cdn.apollographql.com/;",
    },
    debug: !isProd,
    playground: false,

    path: `/`,
    subscriptions: {
      'graphql-ws': {
        onConnect: (context: Context<any>) => {
          const { connectionParams, extra } = context;

          // @ts-ignore
          const ctx = socketContextCreation(connectionParams, extra?.req);
          // @ts-ignore
          extra.graphqlWsContext = ctx;
        },

        onDisconnect: (...args) => {
          // for the brave
        },
        onSubscribe: (ctx, msg) => {
          // for the brave
          Logger.log(`subscriptions-graphql-ws`, {
            context: 'ApolloConfig',
            ctx: (<any>ctx?.extra)?.graphqlWsContext,
            msg,
            params: ctx.connectionParams,
          });
        },
        onClose: (...args) => {},
      },
      // 'subscriptions-transport-ws': {
      //   keepAlive: 900,
      //   // this does not trigger context generation! like graphql-ws
      //   onConnect: (args, client) => {
      //     const ref: any = args;
      //     const ctx = socketContextCreation(ref);
      //     Logger.log(`subscriptions-transport-ws`, { context: 'ApolloConfig', args, ctx });
      //     return ctx;
      //   },
      //   onDisconnect: (...args) => {
      //     // for the brave
      //   },
      //   onSubscribe: (...args) => {
      //     // for the brave
      //   },
      // },
    },
    plugins: [...plugins],
    // plugins: [...plugins],
    // expose this up or down depending on federation
    autoSchemaFile: join(process.cwd(), './schema/yumio-schema.gql'),
    introspection: process.env.ACTIVE_PROFILE !== 'production',
    ...(process.env.ACTIVE_PROFILE == 'production' && { cache: 'bounded' }),
    dataSources: function () {
      // "this" will have a context of Apollo request, do not use arrow function here
      const apolloRequest = this as any;
      const mock: boolean = apolloRequest?.context?.mock ?? false;
      try {
        return {};
        // consumerAPIDataSource: new ConsumerAppDataSource(configService),
      } catch (error) {
        Logger.error(error);
        return {};
      }
    },
    context: ({ req, res, extra, connectionParams, connection }) => {
      try {
        if (extra?.graphqlWsContext) {
          return extra.graphqlWsContext;
        }

        if (connectionParams) {
          // Logger.log({ connectionParams, extra }, `subscriptions-socket-contex`);
          return socketContextCreation(connectionParams);
        }

        // @TODO maybe we can drop the req/res from context? check back after we do the subs
        const jwt = req.headers['authorization']?.split?.(' ')[1];
        const deviceId = String(req.headers['device'] ?? '');
        const userSessionId = String(req.headers['user_session_id'] ?? '');
        const timeZone = String(req.headers['timezone'] ?? '');
        /** @deprecated dropping soon in favour of siteId */
        const serviceAreaId = Number(req.headers['service_area_id'] ?? 0);
        const siteId = Number(req.headers['site_id'] ?? 0) || serviceAreaId;
        const firebaseDeviceId = String(req.headers['device_id_firebase'] ?? '');
        const apiKey = String(req.headers['api-key'] ?? req.headers['api_key'] ?? '');
        const locale = req.headers['locales']?.split?.('|') ?? [];

        return <IContextHttp>{
          id: randomUUID(),
          serviceAreaId,
          siteId,
          timeZone,
          mock: false,
          req,
          res,
          jwt,
          locale,
          // This is now done by the default guard
          user: { id: 0 },
          deviceId,
          firebaseDeviceId,
          userSessionId,
          apiKey,
          cached: false,
          // complexity, SET BY THE COMPLEXITY PLUGIN
        };
      } catch (_) {
        Logger.error('Error on context', _, { context: 'ApolloConfig' });
        return <IContextHttp>{
          id: randomUUID(),
          serviceAreaId: 0,
          siteId: 0,
          timeZone: '',
          mock: false,
          req,
          res,
          locale: ``,
          user: { id: 0 },
          jwt: '',
          userSessionId: '',
          firebaseDeviceId: '',
          deviceId: '',
          apiKey: '',
          cached: false,
        };
      }
    },
  };

export interface IJWT {
  identity: {
    role?: { id: number };
    user: { id: number };
    entities?: any[];
    permissions?: any[];
    sub_role?: { id: number };
  };
  iss?: string;
  exp?: number;
}

function socketContextCreation(ref, req = null) {
  const jwt: string =
    ref?.AUTHORIZATION?.split?.(' ')?.[1] ||
    ref?.authorization?.split?.(' ')?.[1] ||
    ref?.Authorization?.split?.(' ')?.[1] ||
    '';

  const deviceId = String(ref?.device || ref.Device || ref.DEVICE || '');
  const userSessionId = String(
    ref?.user_session_id || ref?.User_Session_Id || ref?.USER_SESSION_ID || '',
  );
  const timeZone = String(ref?.Timezone || ref?.TIMEZONE || ref?.timezone || '');
  const serviceAreaId = Number(
    ref?.service_area_id || ref?.Service_Area_Id || ref?.SERVICE_AREA_ID || 0,
  );
  const firebaseDeviceId = String(
    ref?.device_id_firebase || ref?.Device_Id_Firebase || ref?.DEVICE_ID_FIREBASE || '',
  );
  const apiKey = String(
    ref?.['Api-key'] ||
      ref?.['api-key'] ||
      ref?.['API-KEY'] ||
      ref?.['Api-Key'] ||
      ref?.api_key ||
      ref?.Api_Key ||
      ref?.API_KEY ||
      '',
  );

  const locale = (ref.locales || ref.Locales || ref.Locales)?.split?.('|') ?? [];

  return <any>(<IContextSocket>{
    id: randomUUID(),
    serviceAreaId,
    timeZone,
    mock: ref?.mock === 'true' || ref?.Mock === 'true',
    req: null,
    // socket: client,
    // This is now done by the default guard
    user: { id: 0 },
    locale,
    jwt,
    deviceId,
    firebaseDeviceId,
    userSessionId,
    apiKey,
  });
}
