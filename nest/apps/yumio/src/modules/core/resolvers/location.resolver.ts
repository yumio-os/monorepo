import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from '@yumio/common/decorators';
import { Location } from '@yumio/modules/core';

import { LocationService } from '../services/location.service';
import { ProjectionService } from '../services/projections.service';

@ArgsType()
export class ArgsLocationById {
  @Field((_) => Int)
  locationId: number;
}

@Resolver()
export class LocationResolver {
  constructor(
    private locationService: LocationService,
    private projection: ProjectionService,
  ) {}

  @Query((_) => Location, { nullable: true })
  async coreLocation(@FieldMap() fieldMap, @Args() { locationId }: ArgsLocationById) {
    return this.locationService.findOneById(locationId, this.projection.location(fieldMap));
  }
}
