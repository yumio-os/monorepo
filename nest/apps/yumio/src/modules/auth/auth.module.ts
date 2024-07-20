import {
  forwardRef,
  Module,
} from '@nestjs/common';

import { ApiKeyDbModule } from '../../datasources/db/apiKey/apiKey.module';
import { RedisClientModule } from '../../internal/redis/redisClient.module';
import {
  ApiKeyOrAuthGuard,
  ApiKeyV2Guard,
  AuthGuardInfo,
} from './guards/apiKey.guard';
import { AuthResolver } from './resolvers/auth.resolver';
import { PhonumberNumberScalar } from './scalars/PhoneNumber';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    forwardRef(() => ApiKeyDbModule),
    forwardRef(() => RedisClientModule),
  ],
  exports: [AuthService, AuthGuardInfo, ApiKeyOrAuthGuard, ApiKeyV2Guard, PhonumberNumberScalar],
  controllers: [],
  providers: [
    AuthResolver,
    AuthService,
    AuthGuardInfo,
    ApiKeyOrAuthGuard,
    ApiKeyV2Guard,
    PhonumberNumberScalar,
  ],
})
export class AuthModule {}
