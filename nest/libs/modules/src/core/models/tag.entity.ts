import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import { ItemImages } from './businessBaseItem.entity';
import { Menu } from './menu.entity';
import { MenuBaseItem } from './menuBaseItem.entity';

export enum TagType {
  collection = 'collection',
  category = 'category',
}

export const TagTypeRegistered = registerEnumType(TagType, {
  name: 'TagType',
  valuesMap: {
    collection: {
      description: 'collection',
    },
    category: {
      description: 'category',
    },
  },
});

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => String)
  @Column()
  name: string;

  @Field((_) => TagType, { defaultValue: TagType.collection })
  @Column({ type: 'simple-enum', enum: TagType, default: TagType.collection })
  type: TagType;

  @OneToMany((_) => TagMenu, (tagMenu) => tagMenu.tag, { nullable: true })
  @Field((_) => [TagMenu], { defaultValue: [] })
  tagMenu: TagMenu[];
  // todo relation to menu base item

  @Field((_) => ItemImages, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  images?: ItemImages;
}

// todo uniqune menu and tagId
@Entity()
@ObjectType()
@Unique('tagMenuUnq', ['tagId', 'menuId'])
export class TagMenu extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => String, { nullable: true })
  @Column({ nullable: true })
  name?: string;

  @Field((_) => Int, { nullable: true })
  @Column({ type: 'integer' })
  tagId: number;

  @ManyToOne(() => Tag)
  @JoinTable({ name: 'tagId' })
  @Field((_) => Tag)
  tag: Tag;

  @Field((_) => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  menuId: number;

  @ManyToOne(() => Menu)
  @JoinTable({ name: 'menuId' })
  @Field((_) => Menu)
  menu: Menu;

  @Field((_) => Int, { nullable: true })
  @Column({
    type: 'int',
    nullable: true,
  })
  position?: number;

  @ManyToMany((_) => MenuBaseItem, (menuBaseItem) => menuBaseItem.tags)
  @Field((_) => [MenuBaseItem], { defaultValue: [] })
  menuItems: MenuBaseItem[];

  // MTMMenuItemToMenuTag
  // @Field((_) => [MTMMenuItemToMenuTag], { defaultValue: [] })
  // @OneToMany((_) => MTMMenuItemToMenuTag, (mtmtenuItemToMenuTag) => mtmtenuItemToMenuTag.tagMenuId)
  // @JoinColumn()
  // tagItems: MTMMenuItemToMenuTag[];

  @Field((_) => ItemImages, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  images?: ItemImages;
}

@ObjectType()
@Entity('menuBaseItem_to_tags')
export class MTMMenuItemToMenuTag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_) => Int)
  id: number;

  // @Column({ type: 'bigint' })
  @PrimaryColumn()
  @Field((_) => Int)
  menuBaseItemId: number;

  @ManyToOne((_) => MenuBaseItem, (menuBaseItem) => menuBaseItem.id)
  @Field((_) => MenuBaseItem)
  menuBaseItem: MenuBaseItem;

  // @Column({ type: 'bigint' })
  @PrimaryColumn()
  tagMenuId: number;

  @ManyToOne((_) => TagMenu, (tagMenu) => tagMenu.id)
  @Field((_) => TagMenu)
  tagMenu: TagMenu;

  // @ManyToOne((_) => TagMenu, (tagMenu) => tagMenu.id)
  // // @JoinTable({ name: 'tagMenuId' })
  // tagMenu: TagMenu;
}
