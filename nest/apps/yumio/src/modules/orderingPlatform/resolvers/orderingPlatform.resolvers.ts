import { uniq } from 'lodash';

import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from '@yumio/common/decorators';
import { Brand, Business, TagType } from '@yumio/modules/core';

import { LocationService } from '../../core/services/location.service';
import { MenuService } from '../../core/services/menu.service';
import { MenuBaseItemService } from '../../core/services/menuBaseItem.service';
import { ProjectionService } from '../../core/services/projections.service';
import { SiteService } from '../../core/services/site.service';
import { TagService } from '../../core/services/tag.service';
import { mapCoreBrandsToOp } from '../mappers/brand.mapper';
import { mapCoreBusinessesToOp } from '../mappers/business.mapper';
import { mapCoreSiteToOp } from '../mappers/site.mapper';
import { mapCoreTagMenusToOp, mapCoreTagsToOp } from '../mappers/tag.mapper';
import { mapCoreMenuBaseItemsToTopItem } from '../mappers/topLineItem.mapper';
import { OPBrand, OPBusiness, OPSite, OPTag, OPTagMenu, OPTopLineItem } from '../models/topLineItem.model';

@ArgsType()
class ArgsBySiteId {
  @Field((_) => Int)
  siteId: number;
}

@ArgsType()
class ArgsTagBySiteId {
  @Field((_) => Int)
  siteId: number;

  @Field((_) => TagType, { nullable: true })
  type?: TagType;
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

@ArgsType()
class ArgsBySiteIdAndBrandId {
  @Field((_) => Int)
  siteId: number;

  @Field((_) => Int)
  brandId: number;
}
@Resolver()
export class OrderingPlatformResolver {
  constructor(
    private siteService: SiteService,
    private locationService: LocationService,
    private menuService: MenuService,
    private tagService: TagService,
    private menuBaseItemService: MenuBaseItemService,
    private projection: ProjectionService,
  ) {}

  @Query((_) => [OPTopLineItem], { defaultValue: [] })
  async opItemsInSite(@FieldMap() fieldMap, @Args() { siteId }: ArgsBySiteId): Promise<OPTopLineItem[]> {
    const items = await this.menuBaseItemService.findInSite(siteId, true, this.projection.itemsMenu(fieldMap));
    const mappedData = mapCoreMenuBaseItemsToTopItem(items);
    return mappedData;
  }

  @Query((_) => [OPTopLineItem]) // item in business with active menu
  async opItemsInLocation(@FieldMap() fieldMap, @Args() { locationId }: ArgsByLocationId): Promise<OPTopLineItem[]> {
    const items = await this.menuBaseItemService.findInLocation(locationId, true, this.projection.itemsMenu(fieldMap));
    const mappedData = mapCoreMenuBaseItemsToTopItem(items);
    return mappedData;
  }

  @Query((_) => [OPTopLineItem]) //
  async opItemsInActiveMenu(@FieldMap() fieldMap, @Args() { menuId }: ArgsByMenuId): Promise<OPTopLineItem[]> {
    const items = await this.menuBaseItemService.findInMenu(menuId, true, this.projection.itemsMenu(fieldMap));
    const mappedData = mapCoreMenuBaseItemsToTopItem(items);
    return mappedData;
  }

  @Query((_) => [OPTopLineItem]) //
  async opItemsInMenu(@FieldMap() fieldMap, @Args() { menuId }: ArgsByMenuId): Promise<OPTopLineItem[]> {
    const items = await this.menuBaseItemService.findInMenu(menuId, null, this.projection.itemsMenu(fieldMap));
    const mappedData = mapCoreMenuBaseItemsToTopItem(items);
    return mappedData;
  }

  @Query((_) => [OPTopLineItem]) // needs to be in active menu in site for specyfic brand
  async opItemsInSiteForBrand(@FieldMap() fieldMap, @Args() { brandId, siteId }: ArgsBySiteIdAndBrandId) {
    const items = await this.menuBaseItemService.findInSiteAndBrand(siteId, brandId, null, this.projection.itemsMenu(fieldMap));
    const mappedData = mapCoreMenuBaseItemsToTopItem(items);
    return mappedData;
  }

  @Query((_) => [OPTopLineItem]) // needs to be in active menu in collection
  async opItemsInSiteForCollection(@FieldMap() fieldMap, @Args() { brandId, siteId }: ArgsBySiteIdAndBrandId) {}

  @Query((_) => [OPTopLineItem]) // needs to be in active menu in collection
  async opItemsInSiteBrandForCollection(@FieldMap() fieldMap, @Args() { brandId, siteId }: ArgsBySiteIdAndBrandId) {}

  @Query((_) => [OPTopLineItem]) // needs to be in active menu in collection
  async opItemsInMenuForCollection(@FieldMap() fieldMap, @Args() { brandId, siteId }: ArgsBySiteIdAndBrandId) {}

  @Query((_) => [OPTopLineItem]) // needs to be in active menu in collection
  async opItemsInLocationForCollection(@FieldMap() fieldMap, @Args() { brandId, siteId }: ArgsBySiteIdAndBrandId) {}

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

  @Query((_) => [OPTag])
  async opSiteTags(@Args() { siteId, type }: ArgsTagBySiteId): Promise<OPTag[]> {
    const tags = await this.tagService.findActiveTagsInSite(siteId, type);
    const mappedTags = mapCoreTagsToOp(uniq(tags));
    return mappedTags;
  }

  @Query((_) => [OPTagMenu])
  async opSiteMenuTags(@Args() { siteId, type }: ArgsTagBySiteId): Promise<OPTagMenu[]> {
    const tagMenus = await this.tagService.findActiveMenuTagsInSite(siteId, type);
    const mappedMenuTags = mapCoreTagMenusToOp(uniq(tagMenus));
    return mappedMenuTags;
  }
}
