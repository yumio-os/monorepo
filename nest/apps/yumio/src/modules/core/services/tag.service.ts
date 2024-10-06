import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag, TagMenu, TagType } from '@yumio/modules/core';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private repo: Repository<Tag>,
  ) {}

  async findOneById(id: number, relations = [], entityManager = this.repo.manager) {
    return entityManager.findOne(Tag, { where: { id }, relations });
  }

  async findActiveTagsInSite(siteId: number, type: TagType, entityManager = this.repo.manager) {
    let query = entityManager
      .createQueryBuilder(Tag, 'tag')
      .leftJoinAndSelect('tag.tagMenu', 'tagMenu')
      .leftJoinAndSelect('tagMenu.menu', 'menu')
      .leftJoinAndSelect('menu.location', 'location')
      .where('location.siteId = :siteId', { siteId })
      .andWhere('location.activeMenuId = menu.id'); // Ensuring activeMenuId matches menu.id

    if (type) {
      query = query.andWhere('tag.type = :type', { type });
    }

    return query.getMany();
  }

  async findTagsInSite(siteId: number, type?: TagType, relations = [], entityManager = this.repo.manager) {
    const query = { where: { tagMenu: { menu: { location: { siteId } } } }, relations };
    if (type) {
      query.where['type'] = type;
    }

    return entityManager.find(Tag, query);
  }

  async findMenuTagsInSite(siteId: number, type?: TagType, relations = [], entityManager = this.repo.manager) {
    const query = { where: { menu: { location: { siteId } } }, relations };
    if (type) {
      query.where['type'] = type;
    }

    return entityManager.find(TagMenu, query);
  }

  async findActiveMenuTagsInSite(siteId: number, type?: TagType, entityManager = this.repo.manager) {
    let query = entityManager
      .createQueryBuilder(TagMenu, 'tagMenu')
      .leftJoinAndSelect('tagMenu.tag', 'tag')
      .leftJoinAndSelect('tagMenu.menu', 'menu')
      .leftJoinAndSelect('menu.location', 'location')
      .where('location.siteId = :siteId', { siteId })
      .andWhere('location.activeMenuId = menu.id'); // Ensuring activeMenuId matches menu.id

    if (type) {
      query = query.andWhere('tag.type = :type', { type });
    }

    return query.getMany();
  }

  async findActiveTagsInLocation(locationId: number, type?: TagType, entityManager = this.repo.manager) {
    let query = entityManager
      .createQueryBuilder(Tag, 'tag')
      .leftJoinAndSelect('tag.tagMenu', 'tagMenu')
      .leftJoinAndSelect('tagMenu.menu', 'menu')
      .leftJoinAndSelect('menu.location', 'location')
      .where('menu.locationId = :locationId', { locationId })
      .andWhere('location.activeMenuId = menu.id'); // Ensuring activeMenuId matches menu.id

    if (type) {
      query = query.andWhere('tag.type = :type', { type });
    }

    return query.getMany();
  }

  async findTagsInLocation(locationId: number, type?: TagType, relations = [], entityManager = this.repo.manager) {
    const query = { where: { tagMenu: { menu: { locationId } } }, relations };
    if (type) {
      query.where['type'] = type;
    }

    return entityManager.find(Tag, query);
  }

  async findTagsInMenu(menuId: number, type?: TagType, relations = [], entityManager = this.repo.manager) {
    const query = { where: { tagMenu: { menuId } }, relations };
    if (type) {
      query.where['type'] = type;
    }

    return entityManager.find(Tag, query);
  }
}
