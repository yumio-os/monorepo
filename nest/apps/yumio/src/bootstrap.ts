import * as compression from 'compression';
import * as dotenv from 'dotenv';
import helmet from 'helmet';

import { LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { createWinstonLogger } from './internal/logger/winston.logger';

export async function bootstrap(path?: string) {
  dotenv.config({ ...(path && { path }), override: true });

  // create winston logger
  const logLevel = process.env.LOG_LEVEL ?? 'info';
  const logDepth = +(process.env.LOG_DEPTH ?? 4);

  // default Nest Logger
  const defaultNestLogger: LogLevel[] = ['error', 'warn', 'log', 'verbose'];

  let logger: any = defaultNestLogger; // nest logger

  // testing env -> use default nest logger
  if (process.env.ACTIVE_PROFILE != 'test') {
    const winstonLogger = createWinstonLogger(logLevel, logDepth);
    logger = winstonLogger;
  }

  const app = await NestFactory.create(AppModule, {
    logger,
    cors: {
      origin: '*',
      credentials: true,
    },
  });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  app.use(compression());

  app.enableShutdownHooks();
  // const defaultGuard = app.select(AuthModule).get(DefaultGuard);
  // app.useGlobalGuards(defaultGuard);

  await app.listen(process.env['PORT'] ?? 4000);
  return app;
}
