import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BusinessBaseItem, ItemDiscountSettings, ItemImages } from './businessBaseItem.entity';
import { TaxSettings } from './location.entity';
import { Menu } from './menu.entity';
import { MenuAddon } from './menuAddons.entity';
import { StockLevel } from './stock.entity';
import { TagMenu } from './tag.entity';

@ObjectType()
@Entity()
export class MenuBaseItem extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  // todo index
  @Field((_) => Int)
  @Index()
  @Column({ type: 'integer' })
  businessBaseItemId: number;

  @ManyToOne(() => BusinessBaseItem)
  @JoinColumn({ name: 'businessBaseItemId' })
  @Field((_) => BusinessBaseItem)
  businessBaseItem: BusinessBaseItem;

  // todo index
  @Field((_) => Int)
  @Index()
  @Column({ type: 'integer' })
  menuId: number;

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'menuId' })
  @Field((_) => Menu)
  menu: Menu;

  @Field((_) => [MenuAddon], { defaultValue: [] })
  @OneToMany((_) => MenuAddon, (menuAddon) => menuAddon.menuBaseItem)
  @JoinColumn()
  addons: MenuAddon[]; // modifier+adon

  // overrides
  @Field((_) => String, { nullable: true })
  @Column({ length: 20 })
  name?: string;

  @Field((_) => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field((_) => ItemImages, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  images?: ItemImages;

  @Field((_) => Int)
  @Column({ type: 'integer', default: 0 })
  price: number;

  @Field((_) => ItemDiscountSettings, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  discount: ItemDiscountSettings;

  @Field((_) => Int, { defaultValue: 0 })
  @Column({ type: 'int', nullable: true })
  position: number;

  // ===== take from join

  @Index()
  @Field((_) => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  stockId?: number;

  @ManyToOne((_) => StockLevel, { nullable: true })
  @JoinColumn({ name: 'stockId' })
  @Field((_) => StockLevel, { nullable: true })
  stock?: StockLevel;

  // TODO tags intermediatary
  @ManyToMany((_) => TagMenu, (tagMenu) => tagMenu.menuItems)
  @JoinTable({
    name: 'menuBaseItem_to_tags',
    joinColumn: { referencedColumnName: 'id' },
    inverseJoinColumn: { referencedColumnName: 'id' },
  })
  @Field((_) => [TagMenu], { defaultValue: [] })
  tags: TagMenu[];
  // todo manually make that realation - https://github.com/typeorm/typeorm/issues/1224

  @Field((_) => TaxSettings, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  tax: TaxSettings;
}
