import { FindManyOptions, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from '@yumio/common/pagination';
import { MenuBaseItem } from '@yumio/modules/core';

@Injectable()
export class MenuBaseItemService {
  constructor(
    @InjectRepository(MenuBaseItem)
    private repo: Repository<MenuBaseItem>,
  ) {}

  private fillWhereMenuActive(query: FindManyOptions<MenuBaseItem>, active?: boolean) {
    if (!query) {
      return;
    }

    if (active === undefined || active === null) {
      return;
    }

    if (!query['where']) {
      query['where'] = {};
    }

    if (!query['where']['menu']) {
      query['where']['menu'] = {};
    }

    query.where['menu']['default'] = active;
  }

  private handlePagination(query, pagination?: Pagination) {
    if (!query) {
      return;
    }

    if (!pagination) {
      return;
    }

    if (!pagination.page || pagination.page < 0) {
      return;
    }

    if (!pagination.size || pagination.size < 0) {
      return;
    }

    if (pagination.size > 500) {
      pagination.size = 500;
    }

    query.pagination = pagination;
  }

  findOneById(id: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.findOne(MenuBaseItem, { where: { id }, relations });
  }

  //  ======================================== findInSite
  private findInSiteWhere(siteId: number) {
    return {
      menu: {
        location: { siteId }, // Assuming Menu is related to Location and Location is related to Site
      },
    };
  }

  findInSite(siteId: number, active?: boolean, relations = [], pagination?: Pagination, entityManager = this.repo.manager) {
    const query = {
      where: this.findInSiteWhere(siteId),
      relations,
    };

    this.fillWhereMenuActive(query, active);
    this.handlePagination(query, pagination);

    return entityManager.find(MenuBaseItem, query);
  }

  findInSiteCount(siteId: number, active?: boolean, entityManager = this.repo.manager) {
    const query = {
      where: this.findInSiteWhere(siteId),
    };

    this.fillWhereMenuActive(query, active);

    return entityManager.count(MenuBaseItem, query);
  }
  //  ======================================== findInSite

  //  ======================================== findInLocation
  private findInLocationWhere(locationId: number) {
    return {
      menu: {
        locationId, // Assuming Menu is related to Location and Location is related to Site
      },
    };
  }

  findInLocation(locationId: number, active?: boolean, relations = [], pagination?: Pagination, entityManager = this.repo.manager) {
    const query = {
      where: this.findInLocationWhere(locationId),
      relations,
    };

    this.fillWhereMenuActive(query, active);
    this.handlePagination(query, pagination);

    return entityManager.find(MenuBaseItem, query);
  }

  findInLocationCount(locationId: number, active?: boolean, entityManager = this.repo.manager) {
    const query = {
      where: this.findInLocationWhere(locationId),
    };

    this.fillWhereMenuActive(query, active);

    return entityManager.count(MenuBaseItem, query);
  }
  //  ======================================== findInLocation

  //  ======================================== findInMenu
  private findInMenuWhere(menuId: number) {
    return {
      menuId,
    };
  }

  findInMenu(menuId: number, active?: boolean, relations = [], pagination?: Pagination, entityManager = this.repo.manager) {
    const query = {
      where: this.findInMenuWhere(menuId),
      relations,
    };

    this.fillWhereMenuActive(query, active);
    this.handlePagination(query, pagination);

    return entityManager.find(MenuBaseItem, query);
  }

  findInMenuCount(menuId: number, active?: boolean, entityManager = this.repo.manager) {
    const query = {
      where: this.findInMenuWhere(menuId),
    };

    this.fillWhereMenuActive(query, active);

    return entityManager.count(MenuBaseItem, query);
  }
  //  ======================================== findInMenu

  //  ======================================== findInSiteAndBrand
  private findInSiteAndBrandWhere(siteId: number, brandId: number) {
    return {
      menu: {
        location: { siteId }, // Assuming Menu is related to Location and Location is related to Site
      },
      businessBaseItem: {
        brandId,
      },
    };
  }

  findInSiteAndBrand(
    siteId: number,
    brandId: number,
    active?: boolean,
    relations = [],
    pagination?: Pagination,
    entityManager = this.repo.manager,
  ) {
    const query = {
      where: this.findInSiteAndBrandWhere(siteId, brandId),
      relations,
    };

    this.fillWhereMenuActive(query, active);
    this.handlePagination(query, pagination);

    return entityManager.find(MenuBaseItem, query);
  }

  findInSiteAndBrandCount(siteId: number, brandId: number, active?: boolean, entityManager = this.repo.manager) {
    const query = {
      where: this.findInSiteAndBrandWhere(siteId, brandId),
    };

    this.fillWhereMenuActive(query, active);

    return entityManager.count(MenuBaseItem, query);
  }
  //  ======================================== findInSiteAndBrand

  //  ======================================== findInSiteAndMenuTag
  private findInSiteAndMenuTagWhere(siteId: number, menuTagId: number) {
    return {
      menu: {
        location: { siteId }, // Assuming Menu is related to Location and Location is related to Site
      },
      tags: {
        id: menuTagId, // Filter by tag, no matter the tag type
      },
    };
  }

  findInSiteAndMenuTag(
    siteId: number,
    menuTagId: number,
    active?: boolean,
    relations = [],
    pagination?: Pagination,
    entityManager = this.repo.manager,
  ) {
    const query = {
      where: this.findInSiteAndMenuTagWhere(siteId, menuTagId),
      relations,
    };

    this.fillWhereMenuActive(query, active);
    this.handlePagination(query, pagination);

    return entityManager.find(MenuBaseItem, query);
  }

  findInSiteAndMenuTagCount(siteId: number, menuTagId: number, active?: boolean, entityManager = this.repo.manager) {
    const query = {
      where: this.findInSiteAndMenuTagWhere(siteId, menuTagId),
    };

    this.fillWhereMenuActive(query, active);

    return entityManager.count(MenuBaseItem, query);
  }
  //  ======================================== findInSiteAndMenuTag

  //  ======================================== findInSiteAndBrandAndMenuTag
  private findInSiteAndBrandAndMenuTagWhere(siteId: number, brandId: number, menuTagId: number) {
    return {
      menu: {
        location: { siteId }, // Assuming Menu is related to Location and Location is related to Site
      },
      businessBaseItem: {
        brandId,
      },
      tags: {
        id: menuTagId, // Filter by tag, no matter the tag type
      },
    };
  }

  findInSiteAndBrandAndMenuTag(
    siteId: number,
    brandId: number,
    menuTagId: number,
    active?: boolean,
    relations = [],
    pagination?: Pagination,
    entityManager = this.repo.manager,
  ) {
    const query = {
      where: this.findInSiteAndBrandAndMenuTagWhere(siteId, brandId, menuTagId),
      relations,
    };

    this.fillWhereMenuActive(query, active);
    this.handlePagination(query, pagination);

    return entityManager.find(MenuBaseItem, query);
  }

  findInSiteAndBrandAndMenuTagCount(
    siteId: number,
    brandId: number,
    menuTagId: number,
    active?: boolean,
    entityManager = this.repo.manager,
  ) {
    const query = {
      where: this.findInSiteAndBrandAndMenuTagWhere(siteId, brandId, menuTagId),
    };

    this.fillWhereMenuActive(query, active);

    return entityManager.count(MenuBaseItem, query);
  }
  //  ======================================== findInSiteAndBrandAndMenuTag

  //  ======================================== findInMenuAndMenuTag
  private findInMenuAndMenuTagWhere(menuId: number, menuTagId: number) {
    return {
      menuId,
      tags: {
        id: menuTagId, // Filter by tag, no matter the tag type
      },
    };
  }

  findInMenuAndMenuTag(
    menuId: number,
    menuTagId: number,
    active?: boolean,
    relations = [],
    pagination?: Pagination,
    entityManager = this.repo.manager,
  ) {
    const query = {
      where: this.findInMenuAndMenuTagWhere(menuId, menuTagId),
      relations,
    };

    this.fillWhereMenuActive(query, active);
    this.handlePagination(query, pagination);

    return entityManager.find(MenuBaseItem, query);
  }

  findInMenuAndMenuTagCount(menuId: number, menuTagId: number, active?: boolean, entityManager = this.repo.manager) {
    const query = {
      where: this.findInMenuAndMenuTagWhere(menuId, menuTagId),
    };

    this.fillWhereMenuActive(query, active);

    return entityManager.count(MenuBaseItem, query);
  }
  //  ======================================== findInMenuAndMenuTag

  //  ======================================== findInLocationAndMenuTag
  private findInLocationAndMenuTagWhere(locationId: number, menuTagId: number) {
    return {
      menu: {
        locationId, // Assuming Menu is related to Location and Location is related to Site
      },
      tags: {
        id: menuTagId, // Filter by tag, no matter the tag type
      },
    };
  }

  findInLocationAndMenuTag(
    locationId: number,
    menuTagId: number,
    active?: boolean,
    relations = [],
    pagination?: Pagination,
    entityManager = this.repo.manager,
  ) {
    const query = {
      where: this.findInLocationAndMenuTagWhere(locationId, menuTagId),
      relations,
    };

    this.fillWhereMenuActive(query, active);
    this.handlePagination(query, pagination);

    return entityManager.find(MenuBaseItem, query);
  }

  findInLocationAndMenuTagCount(locationId: number, menuTagId: number, active?: boolean, entityManager = this.repo.manager) {
    const query = {
      where: this.findInLocationAndMenuTagWhere(locationId, menuTagId),
    };

    this.fillWhereMenuActive(query, active);

    return entityManager.count(MenuBaseItem, query);
  }
  //  ======================================== findInLocationAndMenuTag
}
