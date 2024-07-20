import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from '@yumio/common/decorators';
import { BusinessBaseItem } from '@yumio/modules/core';

import { BusinessBaseItemService } from '../services/businessBaseItem.service';
import { ProjectionService } from '../services/projections.service';

@ArgsType()
export class ArgsBusinessBaseItemById {
  @Field((_) => Int)
  businessBaseItemId: number;
}

@Resolver()
export class BusinessBaseItemResolver {
  constructor(
    private businessBaseItemService: BusinessBaseItemService,
    private projection: ProjectionService,
  ) {}

  @Query((_) => BusinessBaseItem, { nullable: true })
  async coreBusinessBaseItem(@FieldMap() fieldMap, @Args() { businessBaseItemId }: ArgsBusinessBaseItemById) {
    return this.businessBaseItemService.findOneById(businessBaseItemId, this.projection.busnessItem(fieldMap));
  }
}
