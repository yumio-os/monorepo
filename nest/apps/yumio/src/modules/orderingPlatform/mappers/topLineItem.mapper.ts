import { BusinessBaseItem, MenuBaseItem } from '@yumio/modules/core';

import { OPBusinessBaseItem, OPTopLineItem } from '../models/topLineItem.model';
import { mapCoreStockLevelToOp } from './stock.mapper';

export function mapCoreMenuBaseItemToTopItem(item: MenuBaseItem) {
  const target = new OPTopLineItem();

  target.id = item.id;
  target.businessBaseItemId = item.businessBaseItemId;
  target.description = item.description;
  target.discount = item.discount;
  target.images = item.images;
  target.menuId = item.menuId;
  target.name = item.name;
  target.position = item.position ?? 0;
  target.price = item.price;
  target.tags = item.tags;
  target.tax = item.tax;

  target.businessBaseItem = mapCoreBusinessItemToOPBusinessBaseItem(item.businessBaseItem);

  // TODO stock was moved out
  target.stock = mapCoreStockLevelToOp(item.stock);

  return target;
}

export function mapCoreMenuBaseItemsToTopItem(items: MenuBaseItem[]) {
  return items?.map?.((item) => mapCoreMenuBaseItemToTopItem(item)) ?? [];
}

export function mapCoreBusinessItemToOPBusinessBaseItem(item: BusinessBaseItem) {
  const target = new OPBusinessBaseItem();

  target.id = item.id;
  target.allowAsAddon = item.allowAsAddon;
  target.allowAsModfier = item.allowAsModfier;
  target.brandId = item.brandId;
  target.businessId = item.businessId;
  target.excludeFromTop = item.excludeFromTop;
  target.sku = item.sku;

  return target;
}
