import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from '@yumio/modules/apiKey';

import { DbModule } from '../../../internal/db/db.module';
import { ApiKeyService } from './services/apiKey.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKey]), DbModule],
  providers: [ApiKeyService],
  exports: [ApiKeyService],
})
export class ApiKeyDbModule {}
