import { Site } from '@yumio/modules/core';

import { OPSite } from '../models/topLineItem.model';

export function mapCoreSiteToOp(cSite: Site) {
  if (!cSite) {
    return null;
  }

  const target = new OPSite();
  target.id = cSite.id;
  target.name = cSite.name;
  target.shortName = cSite.shortName;

  return target;
}
