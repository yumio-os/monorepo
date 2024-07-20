import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from '@yumio/common/decorators';
import { Business } from '@yumio/modules/core';

import { BusinessService } from '../services/business.service';
import { ProjectionService } from '../services/projections.service';

@ArgsType()
export class ArgsBusinessById {
  @Field((_) => Int)
  businessId: number;
}
@Resolver()
export class BusinessResolver {
  constructor(
    private businessService: BusinessService,
    private projection: ProjectionService,
  ) {}

  @Query((_) => Business, { nullable: true })
  async coreBusiness(@FieldMap() fieldMap, @Args() { businessId }: ArgsBusinessById) {
    return this.businessService.findOneById(businessId, this.projection.business(fieldMap));
  }
}
