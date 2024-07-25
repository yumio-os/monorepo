import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessBaseItem } from '@yumio/modules/core';

@Injectable()
export class BusinessBaseItemService {
  constructor(
    @InjectRepository(BusinessBaseItem)
    private repo: Repository<BusinessBaseItem>,
  ) {}

  findOneById(id: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.findOne(BusinessBaseItem, { where: { id }, relations });
  }
}
