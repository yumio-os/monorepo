import { Brand } from '@yumio/modules/core';

import { OPBrand } from '../models/topLineItem.model';

export function mapCoreBrandsToOp(cBrand: Brand[]): OPBrand[] {
  return cBrand?.map?.((brand) => mapCoreBrandToOp(brand)) ?? [];
}

export function mapCoreBrandToOp(cBrand: Brand): OPBrand {
  if (!cBrand) {
    return null;
  }

  const target = new OPBrand();
  target.id = cBrand.id;
  target.name = cBrand.name;
  target.shortName = cBrand.shortName;
  target.images = cBrand.images;

  return target;
}
