import { uniq } from 'lodash';

import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { Brand, Business } from '@yumio/modules/core';

import { LocationService } from '../../core/services/location.service';
import { MenuService } from '../../core/services/menu.service';
import { SiteService } from '../../core/services/site.service';
import { mapCoreBrandsToOp } from '../mappers/brand.mapper';
import { mapCoreBusinessesToOp } from '../mappers/business.mapper';
import { mapCoreLocationsToOp } from '../mappers/location.mapper';
import { mapCoreMenusToOp } from '../mappers/menu.mapper';
import { mapCoreSiteToOp } from '../mappers/site.mapper';
import { mapCoreMenuBaseItemsToTopItem } from '../mappers/topLineItem.mapper';
import { OPBrand, OPBusiness, OPLocation, OPMenu, OPSite, OPTopLineItem } from '../models/topLineItem.model';

@ArgsType()
class ArgsBySiteId {
  @Field((_) => Int)
  siteId: number;
}

@ArgsType()
class ArgsByLocationId {
  @Field((_) => Int)
  locationId: number;
}

@ArgsType()
class ArgsByMenuId {
  @Field((_) => Int)
  menuId: number;
}
@Resolver()
export class OrderingPlatformResolver {
  constructor(
    private siteService: SiteService,
    private locationService: LocationService,
    private menuService: MenuService,
  ) {}

  @Query((_) => [OPLocation], { defaultValue: [] })
  async opItemsInSite(@Args() { siteId }: ArgsBySiteId): Promise<OPLocation[]> {
    const data = await this.siteService.findOneById(siteId, [
      'locations.menus.items.stock',
      'locations.menus.items.tags',
      'locations.menus.items.businessBaseItem',
    ]);
    const mappedData = mapCoreLocationsToOp(data.locations);
    return mappedData;
  }

  @Query((_) => [OPMenu])
  async opItemsInLocation(@Args() { locationId }: ArgsByLocationId): Promise<OPMenu[]> {
    const data = await this.locationService.findOneById(locationId, [
      'menus.items.stock',
      'menus.items.tags',
      'menus.items.businessBaseItem',
    ]);
    const mappedData = mapCoreMenusToOp(data.menus);
    return mappedData;
  }

  @Query((_) => [OPTopLineItem])
  async opItemsInMenu(@Args() { menuId }: ArgsByMenuId): Promise<OPTopLineItem[]> {
    const data = await this.menuService.findOneById(menuId, ['items.stock', 'items.tags', 'items.businessBaseItem']);
    const mappedData = mapCoreMenuBaseItemsToTopItem(data.items);
    return mappedData;
  }

  // opItemsInCollection() {}

  @Query((_) => OPSite)
  async opSite(@Args() { siteId }: ArgsBySiteId) {
    const data = await this.siteService.findOneById(siteId);
    const mappedData = mapCoreSiteToOp(data);
    return mappedData;
  }

  @Query((_) => [OPBrand])
  async opSiteBrands(@Args() { siteId }: ArgsBySiteId) {
    const data = await this.siteService.findOneById(siteId, ['locations.business.brands']);
    const coreBrandsFlat: Brand[] = [];
    for (const location of data.locations) {
      coreBrandsFlat.push(...(location.business.brands ?? []));
    }

    // todo check dedupe
    const mappedBrand = mapCoreBrandsToOp(uniq(coreBrandsFlat));
    return mappedBrand;
  }

  // @Query(_=> GraphQLJSON)
  // opSiteCollection(@Args() { siteId }: ArgsBySiteId): Promise<Tag>  {

  // }

  @Query((_) => [OPBusiness])
  async opSiteBusiness(@Args() { siteId }: ArgsBySiteId): Promise<OPBusiness[]> {
    const data = await this.siteService.findOneById(siteId, ['locations.business']);
    const coreBusinessFlat: Business[] = [];
    coreBusinessFlat.push(...(data?.locations?.map?.((location) => location.business) ?? []));

    const mappedBusiness = mapCoreBusinessesToOp(uniq(coreBusinessFlat));
    return mappedBusiness;
  }
}
