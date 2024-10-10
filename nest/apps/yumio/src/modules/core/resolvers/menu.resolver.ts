import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from '@yumio/common/decorators';
import { Menu } from '@yumio/modules/core';

import { MenuService } from '../services/menu.service';
import { ProjectionService } from '../services/projections.service';

@ArgsType()
export class ArgsMenuById {
  @Field((_) => Int)
  menuId: number;
}

@Resolver()
export class MenuResolver {
  constructor(
    private menuService: MenuService,
    private projection: ProjectionService,
  ) {}

  @Query((_) => Menu, { nullable: true })
  async coreMenu(@FieldMap() fieldMap, @Args() { menuId }: ArgsMenuById) {
    return this.menuService.findOneById(menuId, null, this.projection.menus(fieldMap));
  }
}
