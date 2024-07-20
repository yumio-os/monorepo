import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from '@yumio/common/decorators';
import { BrandBaseItem } from '@yumio/modules/core';

import { BrandBaseItemService } from '../services/brandBaseItem.service';
import { ProjectionService } from '../services/projections.service';

@ArgsType()
export class ArgsBrandBaseItemById {
  @Field((_) => Int)
  brandBaseItemById: number;
}

@Resolver()
export class BrandBaseItemResolver {
  constructor(
    private brandBaseItemService: BrandBaseItemService,
    private projection: ProjectionService,
  ) {}
  @Query((_) => BrandBaseItem, { nullable: true })
  async coreBrandBaseItem(@FieldMap() fieldMap, @Args() { brandBaseItemById }: ArgsBrandBaseItemById) {
    return this.brandBaseItemService.findOneById(brandBaseItemById, this.projection.brandBaseItem(fieldMap));
  }
}
