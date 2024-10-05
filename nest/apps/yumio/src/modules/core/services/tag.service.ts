import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag, TagMenu } from '@yumio/modules/core';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private repo: Repository<Tag>,
  ) {}

  async findOneById(id: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.findOne(Tag, { where: { id }, relations });
  }

  async findActiveTagsInSite(siteId: number, entityManager = this.repo.manager) {
    return entityManager
      .createQueryBuilder(Tag, 'tag')
      .leftJoinAndSelect('tag.tagMenu', 'tagMenu')
      .leftJoinAndSelect('tagMenu.menu', 'menu')
      .leftJoinAndSelect('menu.location', 'location')
      .where('location.siteId = :siteId', { siteId })
      .andWhere('location.activeMenuId = menu.id') // Ensuring activeMenuId matches menu.id
      .getMany();
  }

  async findTagsInSite(siteId: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.find(Tag, { where: { tagMenu: { menu: { location: { siteId } } } }, relations });
  }

  async findMenuTagsInSite(siteId: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.find(TagMenu, { where: { menu: { location: { siteId } } }, relations });
  }

  async findActiveMenuTagsInSite(siteId: number, entityManager = this.repo.manager) {
    return entityManager
      .createQueryBuilder(TagMenu, 'tagMenu')
      .leftJoinAndSelect('tagMenu.tag', 'tag')
      .leftJoinAndSelect('tagMenu.menu', 'menu')
      .leftJoinAndSelect('menu.location', 'location')
      .where('location.siteId = :siteId', { siteId })
      .andWhere('location.activeMenuId = menu.id') // Ensuring activeMenuId matches menu.id
      .getMany();
  }

  async findActiveTagsInLocation(locationId: number, entityManager = this.repo.manager) {
    return entityManager
      .createQueryBuilder(Tag, 'tag')
      .leftJoinAndSelect('tag.tagMenu', 'tagMenu')
      .leftJoinAndSelect('tagMenu.menu', 'menu')
      .leftJoinAndSelect('menu.location', 'location')
      .where('menu.locationId = :locationId', { locationId })
      .andWhere('location.activeMenuId = menu.id') // Ensuring activeMenuId matches menu.id
      .getMany();
  }

  async findTagsInLocation(locationId: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.find(Tag, { where: { tagMenu: { menu: { locationId } } }, relations });
  }

  async findTagsInMenu(menuId: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.find(Tag, { where: { tagMenu: { menuId } }, relations });
  }
}
