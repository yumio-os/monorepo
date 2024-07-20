import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Business } from '@yumio/modules/core';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private repo: Repository<Business>,
  ) {}

  findOneById(id: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.findOne(Business, { where: { id }, relations });
  }
}
