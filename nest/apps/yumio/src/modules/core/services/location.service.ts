import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '@yumio/modules/core';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private repo: Repository<Location>,
  ) {}

  async findOneById(id: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.findOne(Location, { where: { id }, relations });
  }
}
