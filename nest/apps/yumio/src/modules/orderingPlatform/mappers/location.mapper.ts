import { Location } from '@yumio/modules/core';

import { OPLocation } from '../models/topLineItem.model';
import { mapCoreBusinessToOp } from './business.mapper';
import { mapCoreMenusToOp } from './menu.mapper';

export function mapCoreLocationToOp(cLocation: Location): OPLocation {
  if (!cLocation) {
    return null;
  }

  const target = new OPLocation();

  target.id = cLocation.id;
  target.name = cLocation.name;
  target.shortName = cLocation.shortName;

  target.businessId = cLocation.businessId;
  target.tax = cLocation.tax;

  target.menus = mapCoreMenusToOp(cLocation.menus);
  target.business = mapCoreBusinessToOp(cLocation.business);

  return target;
}

export function mapCoreLocationsToOp(cLocations: Location[]): OPLocation[] {
  return cLocations?.map?.((cLocation) => mapCoreLocationToOp(cLocation)) ?? [];
}
