import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from '@yumio/common/decorators';
import { MenuBaseItem } from '@yumio/modules/core';

import { MenuBaseItemService } from '../services/menuBaseItem.service';
import { ProjectionService } from '../services/projections.service';

@ArgsType()
export class ArgsMenuBaseItemById {
  @Field((_) => Int)
  itemId: number;
}

@Resolver()
export class MenuBaseItemResolver {
  constructor(
    private menuBaseItemService: MenuBaseItemService,
    private projection: ProjectionService,
  ) {}

  @Query((_) => MenuBaseItem, { nullable: true })
  async coreMenuBaseItem(@FieldMap() fieldMap, @Args() { itemId }: ArgsMenuBaseItemById) {
    return this.menuBaseItemService.findOneById(itemId, this.projection.itemsMenu(fieldMap));
  }
}
