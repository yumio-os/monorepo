import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandBaseItem } from '@yumio/modules/core';

@Injectable()
export class BrandBaseItemService {
  constructor(
    @InjectRepository(BrandBaseItem)
    private repo: Repository<BrandBaseItem>,
  ) {}

  findOneById(id: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.findOne(BrandBaseItem, { where: { id }, relations });
  }
}
