import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Site } from '@yumio/modules/core';

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(Site)
    private repo: Repository<Site>,
  ) {}

  async findOneById(id: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.findOne(Site, { where: { id }, relations });
  }
}
