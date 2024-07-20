import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from '@yumio/modules/core';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private repo: Repository<Brand>,
  ) {}

  findOneById(id: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.findOne(Brand, { where: { id }, relations });
  }
}
