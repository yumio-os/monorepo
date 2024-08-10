import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { apolloConfigFactory } from './apollo.config';
import { AppResolver } from './app.resolver';
import { loadEnvVarConfig } from './config/load/EnvVarConfig';
import { ApiKeyDbModule } from './datasources/db/apiKey/apiKey.module';
import { DbModule } from './internal/db/db.module';
import { HealthModule } from './internal/health/health.module';
import { ContextFillMiddleware } from './internal/middleware/context.middleware';
import { PubSubModule } from './internal/pubSub/pubSub.module';
import { RedisClientModule } from './internal/redis/redisClient.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from './modules/cache/cache.module';
import { CoreModule } from './modules/core/core.module';
import { OrderingPlatformModule } from './modules/orderingPlatform/orderingPlatform.module';
import { WebhooksController } from './modules/webhooks/controllers/webhooks';
import { WebhooksModule } from './modules/webhooks/webhooks.module';

@Module({
  imports: [
    // Integrations
    DbModule, // <<< TO GO
    RedisClientModule,

    // TwilioClientModule,
    PubSubModule,

    // DB repos - GQL definitions included
    ApiKeyDbModule,

    CoreModule,
    OrderingPlatformModule,

    CacheModule,
    AuthModule,
    WebhooksModule,

    // Init Apollo Server
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [],
      driver: ApolloDriver,
      useFactory: apolloConfigFactory,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadEnvVarConfig],
    }),
    HealthModule,
  ],
  providers: [
    // Basic App resolver
    AppResolver,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextFillMiddleware).forRoutes(WebhooksController);
  }
}
