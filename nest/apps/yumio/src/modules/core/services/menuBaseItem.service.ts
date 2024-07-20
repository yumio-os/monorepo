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
}
