import { Menu } from '@yumio/modules/core';

import { OPMenu } from '../models/topLineItem.model';
import { mapCoreMenuBaseItemsToTopItem } from './topLineItem.mapper';

export function mapCoreMenuToOp(cmenu: Menu) {
  const target = new OPMenu();

  target.id = cmenu.id;
  target.businessId = cmenu.businessId;
  target.name = cmenu.name;

  target.items = mapCoreMenuBaseItemsToTopItem(cmenu.items);

  return target;
}

export function mapCoreMenusToOp(cmenu: Menu[]) {
  return cmenu?.map?.((menu) => mapCoreMenuToOp(menu)) ?? [];
}
