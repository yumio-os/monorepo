import { Injectable } from '@nestjs/common';
import { Brand, BrandBaseItem, Business } from '@yumio/modules/core';

@Injectable()
export class ProjectionService {
  private _check(obj, relations: string[], map, prefix, cnt, limit, key, func) {
    if (obj[key]) {
      const localPrefix = cnt == 0 ? `${key}` : `${prefix}.${key}`;
      relations.push(localPrefix);
      func(obj[key], relations, map, localPrefix, cnt + 1, limit);
    }
  }

  detectLoop(relationMap, key) {
    switch (key) {
      case 'busnessItem':
        if (relationMap[key] >= 2) {
          throw new Error(
            `Circular or repetitive query detected [${key}:${relationMap[key]}], please change your query to include an object type just once`,
          );
        }
        break;
      default:
        if (relationMap[key] >= 2) {
          throw new Error(
            `Circular or repetitive query detected [${key}:${relationMap[key]}], please change your query to include an object type just once`,
          );
        }
        break;
    }

    if (!relationMap[key]) {
      relationMap[key] = 0;
    }
    relationMap[key]++;
  }

  // detectNestingLimit(cnt, limit) {
  //   if (cnt >= limit) {
  //     throw new Error(`Query above the nesting limit ${cnt} >= ${limit}`);
  //   }
  // }

  brand(obj: Brand, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }
    this.detectLoop(map, `brand`);

    this._check(obj, relations, map, prefix, cnt, limit, `businesses`, this.business.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `brandBaseItems`, this.brandBaseItem.bind(this));
    return relations;
  }

  business(obj: Business, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }
    this.detectLoop(map, `business`);

    this._check(obj, relations, map, prefix, cnt, limit, `menus`, this.menus.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `locations`, this.location.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `items`, this.busnessItem.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `brands`, this.brand.bind(this));

    return relations;
  }

  busnessItem(obj, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }
    this.detectLoop(map, `busnessItem`);

    this._check(obj, relations, map, prefix, cnt, limit, `brandBaseItem`, this.brandBaseItem.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `business`, this.business.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `brand`, this.brand.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `tags`, this.tags.bind(this));

    return relations;
  }

  location(obj: Location, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }
    this.detectLoop(map, `location`);
    this._check(obj, relations, map, prefix, cnt, limit, `site`, this.site.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `business`, this.business.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `menus`, this.menus.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `activeMenu`, this.menus.bind(this));

    return relations;
  }

  brandBaseItem(obj: BrandBaseItem, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }
    this.detectLoop(map, `brandBaseItem`);
    this._check(obj, relations, map, prefix, cnt, limit, `brand`, this.brand.bind(this));

    return relations;
  }

  site(obj, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }
    this.detectLoop(map, `site`);

    this._check(obj, relations, map, prefix, cnt, limit, `locations`, this.location.bind(this));

    return relations;
  }

  menus(obj, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }
    this.detectLoop(map, `menus`);

    this._check(obj, relations, map, prefix, cnt, limit, `business`, this.business.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `location`, this.location.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `items`, this.itemsMenu.bind(this));

    return relations;
  }

  itemsMenu(obj, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }

    this.detectLoop(map, `itemsMenu`);

    this._check(obj, relations, map, prefix, cnt, limit, `businessBaseItem`, this.busnessItem.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `menu`, this.menus.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `addons`, this.addons.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `stock`, this.stock.bind(this));

    this._check(obj, relations, map, prefix, cnt, limit, `tags`, this.tagsMenu.bind(this));

    return relations;
  }

  addons(obj, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }
    this.detectLoop(map, `addons`);

    this._check(obj, relations, map, prefix, cnt, limit, `menuBaseItem`, this.itemsMenu.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `items`, this.itemsMenuAddon.bind(this));

    return relations;
  }

  itemsMenuAddon(obj, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }
    this.detectLoop(map, `itemsMenuAddon`);

    this._check(obj, relations, map, prefix, cnt, limit, `menuAddon`, this.addons.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `businessBaseItem`, this.busnessItem.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `stock`, this.stock.bind(this));

    return relations;
  }

  stock(obj, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }

    // this.detectLoop(map, 'stock');

    this._check(obj, relations, map, prefix, cnt, limit, `businessBaseItem`, this.busnessItem.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `location`, this.location.bind(this));

    this._check(obj, relations, map, prefix, cnt, limit, `topLineItems`, this.itemsMenu.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `addonItems`, this.itemsMenuAddon.bind(this));

    return relations;
  }

  tags(obj, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }
    // this.detectLoop(map, `stock`);

    return relations;
  }

  tagsMenu(obj, relations: string[] = [], map = {}, prefix = '', cnt = 0, limit = 10) {
    if (cnt >= limit) {
      return;
    }
    // this.detectLoop(map, `stock`);

    this._check(obj, relations, map, prefix, cnt, limit, `tag`, this.tags.bind(this));
    this._check(obj, relations, map, prefix, cnt, limit, `menuItems`, this.itemsMenu.bind(this));

    return relations;
  }
}
