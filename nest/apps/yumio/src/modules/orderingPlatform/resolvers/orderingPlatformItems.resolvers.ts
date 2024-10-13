import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from '@yumio/common/decorators';
import { DefaultPagiValue, Pagination, PaginationMeta } from '@yumio/common/pagination';

import { MenuBaseItemService } from '../../core/services/menuBaseItem.service';
import { ProjectionService } from '../../core/services/projections.service';
import { mapCoreMenuBaseItemsToTopItem } from '../mappers/topLineItem.mapper';
import { OPTopLineItemsWithPagination } from '../models/topLineItem.model';

@ArgsType()
class ArgsItemsBySiteId {
  @Field((_) => Int)
  siteId: number;

  @Field((_) => Pagination, { defaultValue: DefaultPagiValue() })
  pagination: Pagination;
}

@ArgsType()
class ArgsItemsByLocationId {
  @Field((_) => Int)
  locationId: number;

  @Field((_) => Pagination, { defaultValue: DefaultPagiValue(), nullable: true })
  pagination: Pagination;
}

@ArgsType()
class ArgsItemsByMenuId {
  @Field((_) => Int)
  menuId: number;

  @Field((_) => Pagination, { defaultValue: DefaultPagiValue(), nullable: true })
  pagination: Pagination;
}

@ArgsType()
class ArgsItemsBySiteIdAndBrandId {
  @Field((_) => Int)
  siteId: number;

  @Field((_) => Int)
  brandId: number;

  @Field((_) => Pagination, { defaultValue: DefaultPagiValue(), nullable: true })
  pagination: Pagination;
}

@ArgsType()
class ArgsItemsBySiteIdAndBrandIdAndMenuTagId {
  @Field((_) => Int)
  siteId: number;

  @Field((_) => Int)
  brandId: number;

  @Field((_) => Int)
  tagMenuId: number;

  @Field((_) => Pagination, { defaultValue: DefaultPagiValue(), nullable: true })
  pagination: Pagination;
}

@ArgsType()
class ArgsItemsBySiteIdAndMenuTagId {
  @Field((_) => Int)
  siteId: number;

  @Field((_) => Int)
  tagMenuId: number;

  @Field((_) => Pagination, { defaultValue: DefaultPagiValue(), nullable: true })
  pagination: Pagination;
}

@ArgsType()
class ArgsItemsByMenuAndTagMenu {
  @Field((_) => Int)
  tagMenuId: number;

  @Field((_) => Int)
  menuId: number;

  @Field((_) => Pagination, { defaultValue: DefaultPagiValue(), nullable: true })
  pagination: Pagination;
}

@ArgsType()
class ArgsItemsByLocationAndTagMenu {
  @Field((_) => Int)
  tagMenuId: number;

  @Field((_) => Int)
  locationId: number;

  @Field((_) => Pagination, { defaultValue: DefaultPagiValue(), nullable: true })
  pagination: Pagination;
}

@Resolver()
export class OrderingPlatformItemsResolver {
  constructor(
    private menuBaseItemService: MenuBaseItemService,
    private projection: ProjectionService,
  ) {}

  private handlePaginationMeta(response: OPTopLineItemsWithPagination, pagination: Pagination, count: number) {
    if (!response) {
      return;
    }

    response.pagination = new PaginationMeta();
    response.pagination.totalCount = count ?? 0;
    response.pagination.size = pagination.size;
    response.pagination.page = pagination.page;
  }

  @Query((_) => OPTopLineItemsWithPagination)
  async opItemsInSite(@FieldMap() fieldMap, @Args() { siteId, pagination }: ArgsItemsBySiteId): Promise<OPTopLineItemsWithPagination> {
    const response = new OPTopLineItemsWithPagination();
    fieldMap = this.projection.removePrefix(fieldMap, 'items');

    await Promise.all([
      (async () => {
        const items = await this.menuBaseItemService.findInSite(siteId, true, this.projection.itemsMenu(fieldMap), pagination);
        response.items = mapCoreMenuBaseItemsToTopItem(items);
      })(),
      (async () => {
        const count = await this.menuBaseItemService.findInSiteCount(siteId, true);
        this.handlePaginationMeta(response, pagination, count);
      })(),
    ]);

    return response;
  }

  @Query((_) => OPTopLineItemsWithPagination) // item in business with active menu
  async opItemsInLocation(
    @FieldMap() fieldMap,
    @Args() { locationId, pagination }: ArgsItemsByLocationId,
  ): Promise<OPTopLineItemsWithPagination> {
    const response = new OPTopLineItemsWithPagination();
    fieldMap = this.projection.removePrefix(fieldMap, 'items');

    await Promise.all([
      (async () => {
        const items = await this.menuBaseItemService.findInLocation(locationId, true, this.projection.itemsMenu(fieldMap), pagination);
        response.items = mapCoreMenuBaseItemsToTopItem(items);
      })(),
      (async () => {
        const count = await this.menuBaseItemService.findInLocationCount(locationId, true);
        this.handlePaginationMeta(response, pagination, count);
      })(),
    ]);

    return response;
  }

  @Query((_) => OPTopLineItemsWithPagination) //
  async opItemsInActiveMenu(
    @FieldMap() fieldMap,
    @Args() { menuId, pagination }: ArgsItemsByMenuId,
  ): Promise<OPTopLineItemsWithPagination> {
    const response = new OPTopLineItemsWithPagination();
    fieldMap = this.projection.removePrefix(fieldMap, 'items');

    await Promise.all([
      (async () => {
        const items = await this.menuBaseItemService.findInMenu(menuId, true, this.projection.itemsMenu(fieldMap), pagination);
        response.items = mapCoreMenuBaseItemsToTopItem(items);
      })(),
      (async () => {
        const count = await this.menuBaseItemService.findInMenuCount(menuId, true);
        this.handlePaginationMeta(response, pagination, count);
      })(),
    ]);

    return response;
  }

  @Query((_) => OPTopLineItemsWithPagination) //
  async opItemsInMenu(@FieldMap() fieldMap, @Args() { menuId, pagination }: ArgsItemsByMenuId): Promise<OPTopLineItemsWithPagination> {
    const response = new OPTopLineItemsWithPagination();
    fieldMap = this.projection.removePrefix(fieldMap, 'items');

    await Promise.all([
      (async () => {
        const items = await this.menuBaseItemService.findInMenu(menuId, null, this.projection.itemsMenu(fieldMap), pagination);
        response.items = mapCoreMenuBaseItemsToTopItem(items);
      })(),
      (async () => {
        const count = await this.menuBaseItemService.findInMenuCount(menuId, null);
        this.handlePaginationMeta(response, pagination, count);
      })(),
    ]);

    return response;
  }

  @Query((_) => OPTopLineItemsWithPagination) // needs to be in active menu in site for specyfic brand
  async opItemsInSiteForBrand(
    @FieldMap() fieldMap,
    @Args() { brandId, siteId, pagination }: ArgsItemsBySiteIdAndBrandId,
  ): Promise<OPTopLineItemsWithPagination> {
    const response = new OPTopLineItemsWithPagination();
    fieldMap = this.projection.removePrefix(fieldMap, 'items');

    await Promise.all([
      (async () => {
        const items = await this.menuBaseItemService.findInSiteAndBrand(
          siteId,
          brandId,
          true,
          this.projection.itemsMenu(fieldMap),
          pagination,
        );
        response.items = mapCoreMenuBaseItemsToTopItem(items);
      })(),
      (async () => {
        const count = await this.menuBaseItemService.findInSiteAndBrandCount(siteId, brandId, true);
        this.handlePaginationMeta(response, pagination, count);
      })(),
    ]);

    return response;
  }

  @Query((_) => OPTopLineItemsWithPagination) // needs to be in active menu in collection
  async opItemsInSiteForCollection(
    @FieldMap() fieldMap,
    @Args() { tagMenuId, siteId, pagination }: ArgsItemsBySiteIdAndMenuTagId,
  ): Promise<OPTopLineItemsWithPagination> {
    const response = new OPTopLineItemsWithPagination();
    fieldMap = this.projection.removePrefix(fieldMap, 'items');

    await Promise.all([
      (async () => {
        const items = await this.menuBaseItemService.findInSiteAndMenuTag(
          siteId,
          tagMenuId,
          true,
          this.projection.itemsMenu(fieldMap),
          pagination,
        );
        response.items = mapCoreMenuBaseItemsToTopItem(items);
      })(),
      (async () => {
        const count = await this.menuBaseItemService.findInSiteAndMenuTagCount(siteId, tagMenuId, true);
        this.handlePaginationMeta(response, pagination, count);
      })(),
    ]);

    return response;
  }

  @Query((_) => OPTopLineItemsWithPagination) // needs to be in active menu in collection
  async opItemsInSiteBrandForCollection(
    @FieldMap() fieldMap,
    @Args() { brandId, siteId, tagMenuId, pagination }: ArgsItemsBySiteIdAndBrandIdAndMenuTagId,
  ): Promise<OPTopLineItemsWithPagination> {
    const response = new OPTopLineItemsWithPagination();
    fieldMap = this.projection.removePrefix(fieldMap, 'items');

    await Promise.all([
      (async () => {
        const items = await this.menuBaseItemService.findInSiteAndBrandAndMenuTag(
          siteId,
          brandId,
          tagMenuId,
          true,
          this.projection.itemsMenu(fieldMap),
          pagination,
        );
        response.items = mapCoreMenuBaseItemsToTopItem(items);
      })(),
      (async () => {
        const count = await this.menuBaseItemService.findInSiteAndBrandAndMenuTagCount(siteId, brandId, tagMenuId, true);
        this.handlePaginationMeta(response, pagination, count);
      })(),
    ]);

    return response;
  }

  @Query((_) => OPTopLineItemsWithPagination) // needs to be in active menu in collection
  async opItemsInMenuForCollection(
    @FieldMap() fieldMap,
    @Args() { menuId, tagMenuId, pagination }: ArgsItemsByMenuAndTagMenu,
  ): Promise<OPTopLineItemsWithPagination> {
    const response = new OPTopLineItemsWithPagination();
    fieldMap = this.projection.removePrefix(fieldMap, 'items');

    await Promise.all([
      (async () => {
        const items = await this.menuBaseItemService.findInMenuAndMenuTag(
          menuId,
          tagMenuId,
          true,
          this.projection.itemsMenu(fieldMap),
          pagination,
        );
        response.items = mapCoreMenuBaseItemsToTopItem(items);
      })(),
      (async () => {
        const count = await this.menuBaseItemService.findInMenuAndMenuTagCount(menuId, tagMenuId, true);
        this.handlePaginationMeta(response, pagination, count);
      })(),
    ]);

    return response;
  }

  @Query((_) => OPTopLineItemsWithPagination) // needs to be in active menu in collection
  async opItemsInLocationForCollection(
    @FieldMap() fieldMap,
    @Args() { locationId, tagMenuId, pagination }: ArgsItemsByLocationAndTagMenu,
  ): Promise<OPTopLineItemsWithPagination> {
    const response = new OPTopLineItemsWithPagination();
    fieldMap = this.projection.removePrefix(fieldMap, 'items');

    await Promise.all([
      (async () => {
        const items = await this.menuBaseItemService.findInLocationAndMenuTag(
          locationId,
          tagMenuId,
          true,
          this.projection.itemsMenu(fieldMap),
          pagination,
        );
        response.items = mapCoreMenuBaseItemsToTopItem(items);
      })(),
      (async () => {
        const count = await this.menuBaseItemService.findInLocationAndMenuTagCount(locationId, tagMenuId, true);
        this.handlePaginationMeta(response, pagination, count);
      })(),
    ]);

    return response;
  }
}
