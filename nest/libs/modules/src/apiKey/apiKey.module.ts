import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiKey } from './model/apiKey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKey])],
  providers: [],
  exports: [],
})
export class ApiKeyDbModule {}
