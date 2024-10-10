import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from '@yumio/modules/core';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private repo: Repository<Menu>,
  ) {}

  async findOneById(id: number, active?: boolean, relations = [], entityManager = this.repo.manager) {
    const query = { where: { id }, relations };

    if (active !== undefined && active !== null) {
      query.where['default'] = active;
    }

    return entityManager.findOne(Menu, query);
  }

  async findInSite(siteId: number, active?: boolean, relations = [], entityManager = this.repo.manager) {
    const query = {
      where: {
        location: { siteId }, // Assuming Menu has a relation to Location, which has a relation to Site
      },
      relations,
    };

    if (active !== undefined && active !== null) {
      query.where['default'] = active;
    }

    return entityManager.find(Menu, query);
  }
}
