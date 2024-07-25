import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from '@yumio/common/decorators';
import { Brand } from '@yumio/modules/core';

import { BrandService } from '../services/brand.service';
import { ProjectionService } from '../services/projections.service';

@ArgsType()
export class ArgsBrandById {
  @Field((_) => Int)
  brandId: number;
}

@Resolver()
export class BrandResolver {
  constructor(
    private brandService: BrandService,
    private projection: ProjectionService,
  ) {}

  @Query((_) => Brand, { nullable: true })
  async coreBrand(@FieldMap() fieldMap, @Args() { brandId }: ArgsBrandById) {
    return this.brandService.findOneById(brandId, this.projection.brand(fieldMap));
  }
}
