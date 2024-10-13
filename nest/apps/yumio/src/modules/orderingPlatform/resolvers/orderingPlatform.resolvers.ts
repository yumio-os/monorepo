import { uniq } from 'lodash';

import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { Brand, Business, TagType } from '@yumio/modules/core';

import { SiteService } from '../../core/services/site.service';
import { TagService } from '../../core/services/tag.service';
import { mapCoreBrandsToOp } from '../mappers/brand.mapper';
import { mapCoreBusinessesToOp } from '../mappers/business.mapper';
import { mapCoreSiteToOp } from '../mappers/site.mapper';
import { mapCoreTagMenusToOp, mapCoreTagsToOp } from '../mappers/tag.mapper';
import { OPBrand, OPBusiness, OPSite, OPTag, OPTagMenu } from '../models/topLineItem.model';

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

@Resolver()
export class OrderingPlatformResolver {
  constructor(
    private siteService: SiteService,
    private tagService: TagService,
  ) {}

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
