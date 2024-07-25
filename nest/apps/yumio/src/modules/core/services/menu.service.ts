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

  async findOneById(id: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.findOne(Menu, { where: { id }, relations });
  }
}
