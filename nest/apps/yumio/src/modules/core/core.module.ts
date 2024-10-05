import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand, BrandBaseItem, Business, BusinessBaseItem, Location, Menu, MenuBaseItem, Site, StockLevel, Tag } from '@yumio/modules/core';

import { ApiKeyDbModule } from '../../datasources/db/apiKey/apiKey.module';
import { DbModule } from '../../internal/db/db.module';
import { PubSubModule } from '../../internal/pubSub/pubSub.module';
import { RedisClientModule } from '../../internal/redis/redisClient.module';
import { AuthModule } from '../auth/auth.module';
import { CacheModule } from '../cache/cache.module';
import { BrandResolver } from './resolvers/brand.resolver';
import { BrandBaseItemResolver } from './resolvers/brandBaseItem.resolver';
import { BusinessResolver } from './resolvers/business.resolver';
import { BusinessBaseItemResolver } from './resolvers/businessBaseItem.resolver';
import { LocationResolver } from './resolvers/location.resolver';
import { MenuResolver } from './resolvers/menu.resolver';
import { MenuBaseItemResolver } from './resolvers/menuBaseItem.resolver';
import { SiteResolver } from './resolvers/site.resolver';
import { TagResolver } from './resolvers/tag.resolver';
import { BrandService } from './services/brand.service';
import { BrandBaseItemService } from './services/brandBaseItem.service';
import { BusinessService } from './services/business.service';
import { BusinessBaseItemService } from './services/businessBaseItem.service';
import { LocationService } from './services/location.service';
import { MenuService } from './services/menu.service';
import { MenuBaseItemService } from './services/menuBaseItem.service';
import { ProjectionService } from './services/projections.service';
import { SiteService } from './services/site.service';
import { TagService } from './services/tag.service';

@Module({
  imports: [
    forwardRef(() => RedisClientModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ApiKeyDbModule),
    forwardRef(() => CacheModule),
    forwardRef(() => PubSubModule),
    TypeOrmModule.forFeature([Brand, StockLevel, Tag, BusinessBaseItem, MenuBaseItem, Business, Location, Menu, Site, BrandBaseItem]),
    DbModule,
  ],
  exports: [
    BrandService,
    SiteService,
    LocationService,
    BusinessService,
    BusinessBaseItemService,
    BrandBaseItemService,
    MenuService,
    MenuBaseItemService,
    TagService,
  ],
  providers: [
    SiteResolver,
    BusinessResolver,
    LocationResolver,
    BrandResolver,
    BrandBaseItemResolver,
    BusinessBaseItemResolver,
    MenuResolver,
    MenuBaseItemResolver,
    TagResolver,

    // =========
    BrandService,
    SiteService,
    LocationService,
    BusinessService,
    BusinessBaseItemService,
    BrandBaseItemService,
    MenuService,
    MenuBaseItemService,
    TagService,
    // =========
    ProjectionService,
  ],
  controllers: [],
})
export class CoreModule {}
