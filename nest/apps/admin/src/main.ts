import * as dotenv from 'dotenv';
import * as express from 'express';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AdminModule } from './admin.module';

async function bootstrap(path?: string) {
  dotenv.config({ ...(path && { path }), override: true });

  const app = await NestFactory.create(AdminModule);
  app.use(express.json());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: false, // Ensure this is set to false to prevent type transformations
    }),
  );
  await app.listen(3000);
}
bootstrap('.env.admin');
