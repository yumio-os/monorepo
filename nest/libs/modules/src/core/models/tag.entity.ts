import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

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
}

@Entity()
@ObjectType()
export class TagMenu extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => Int, { nullable: true })
  @Column({ type: 'integer' })
  tagId: number;

  @ManyToOne(() => Tag)
  @JoinTable({ name: 'tagId' })
  @Field((_) => Tag)
  tag: Tag;

  @Field((_) => Int, { nullable: true })
  @Column({
    type: 'int',
    nullable: true,
  })
  position?: number;

  @ManyToMany((_) => MenuBaseItem, (menuBaseItem) => menuBaseItem.tags)
  @Field((_) => [MenuBaseItem], { defaultValue: [] })
  menuItems: MenuBaseItem[];

  // todo manually make that realation
}

@Entity('menuBaseItem_to_tags')
export class MTMMenuItemToMenuTag extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  // @Column({ type: 'bigint' })
  @PrimaryColumn()
  menuBaseItemId: number;

  // @Column({ type: 'bigint' })
  @PrimaryColumn()
  tagMenuId: number;

  @ManyToOne((_) => MenuBaseItem, (menuBaseItem) => menuBaseItem.id)
  menuBaseItem: MenuBaseItem;

  // @ManyToOne((_) => TagMenu, (tagMenu) => tagMenu.id)
  // // @JoinTable({ name: 'tagMenuId' })
  // tagMenu: TagMenu;
}
