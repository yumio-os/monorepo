import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './models';
import { Brand, BrandBaseItem } from './models/brand.entity';
import { Business } from './models/business.entity';
import { BusinessBaseItem } from './models/businessBaseItem.entity';
import { Location } from './models/location.entity';
import { Menu } from './models/menu.entity';
import { MenuBaseItem } from './models/menuBaseItem.entity';
import { Site } from './models/site.entity';
import { StockLevel } from './models/stock.entity';
import { Tag } from './models/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand, StockLevel, Tag, BusinessBaseItem, MenuBaseItem, Business, Location, Menu, Site, BrandBaseItem, User]),
  ],
  exports: [],
  providers: [],
  controllers: [],
})
export class CoreModule {}
