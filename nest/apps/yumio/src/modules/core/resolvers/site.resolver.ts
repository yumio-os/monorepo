import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from '@yumio/common/decorators';
import { Site } from '@yumio/modules/core';

import { ProjectionService } from '../services/projections.service';
import { SiteService } from '../services/site.service';

@ArgsType()
export class ArgsSiteById {
  @Field((_) => Int)
  siteId: number;
}

@Resolver()
export class SiteResolver {
  constructor(
    private siteService: SiteService,
    private projection: ProjectionService,
  ) {}

  @Query((_) => Site, { nullable: true })
  async coreSite(@FieldMap() fieldMap, @Args() { siteId }: ArgsSiteById) {
    return this.siteService.findOneById(siteId, this.projection.site(fieldMap));
  }
}
