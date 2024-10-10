import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuBaseItem } from '@yumio/modules/core';

@Injectable()
export class MenuBaseItemService {
  constructor(
    @InjectRepository(MenuBaseItem)
    private repo: Repository<MenuBaseItem>,
  ) {}

  async findOneById(id: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.findOne(MenuBaseItem, { where: { id }, relations });
  }

  findInSite(siteId: number, active?: boolean, relations = [], entityManager = this.repo.manager) {
    const query = {
      where: {
        menu: {
          location: { siteId }, // Assuming Menu is related to Location and Location is related to Site
        },
      },
      relations,
    };

    if (active !== undefined && active !== null) {
      query.where['menu']['default'] = active;
    }

    return entityManager.find(MenuBaseItem, query);
  }

  findInLocation(locationId: number, active?: boolean, relations = [], entityManager = this.repo.manager) {
    const query = {
      where: {
        menu: {
          locationId, // Assuming Menu is related to Location and Location is related to Site
        },
      },
      relations,
    };

    if (active !== undefined && active !== null) {
      query.where['menu']['default'] = active;
    }

    return entityManager.find(MenuBaseItem, query);
  }

  findInMenu(menuId: number, active?: boolean, relations = [], entityManager = this.repo.manager) {
    const query = {
      where: {
        menuId,
      },
      relations,
    };

    if (active !== undefined && active !== null) {
      query.where['menu']['default'] = active;
    }

    return entityManager.find(MenuBaseItem, query);
  }

  findInSiteAndBrand(siteId: number, brandId: number, active?: boolean, relations = [], entityManager = this.repo.manager) {
    const query = {
      where: {
        menu: {
          location: { siteId }, // Assuming Menu is related to Location and Location is related to Site
        },
        businessBaseItem: {
          brandId,
        },
      },
      relations,
    };

    if (active !== undefined && active !== null) {
      query.where['menu']['default'] = active;
    }

    return entityManager.find(MenuBaseItem, query);
  }
}
