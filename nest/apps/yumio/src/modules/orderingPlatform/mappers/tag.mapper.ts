import { Tag, TagMenu } from '@yumio/modules/core';

import { OPTag, OPTagMenu } from '../models/topLineItem.model';

export function mapCoreTagsToOp(cTag: Tag[]): OPTag[] {
  return cTag?.map?.((tag) => mapCoreTagToOp(tag)) ?? [];
}

export function mapCoreTagToOp(cTag: Tag): OPTag {
  if (!cTag) {
    return null;
  }

  const target = new OPTag();
  target.id = cTag.id;
  target.name = cTag.name;
  target.images = cTag.images;

  return target;
}

// ========================

export function mapCoreTagMenusToOp(cTagMenu: TagMenu[]): OPTagMenu[] {
  return cTagMenu?.map?.((tagMenu) => mapCoreTagMenuToOp(tagMenu)) ?? [];
}

export function mapCoreTagMenuToOp(cTagMenu: TagMenu): OPTagMenu {
  if (!cTagMenu) {
    return null;
  }

  const target = new OPTagMenu();
  target.id = cTagMenu.id;
  target.name = cTagMenu.name;
  target.tag = mapCoreTagToOp(cTagMenu.tag);
  target.images = cTagMenu.images;

  return target;
}
