import { Business } from '@yumio/modules/core';

import { OPBusiness } from '../models/topLineItem.model';

export function mapCoreBusinessesToOp(cBusinesses: Business[]): OPBusiness[] {
  return cBusinesses?.map?.((Business) => mapCoreBusinessToOp(Business)) ?? [];
}

export function mapCoreBusinessToOp(cBusiness: Business): OPBusiness {
  if (!cBusiness) {
    return null;
  }

  const target = new OPBusiness();
  target.id = cBusiness.id;
  target.name = cBusiness.name;
  target.shortName = cBusiness.shortName;
  target.images = cBusiness.images;

  return target;
}
