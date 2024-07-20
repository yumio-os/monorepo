import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BusinessBaseItem } from './businessBaseItem.entity';
import { Location } from './location.entity';
import { MenuAddonItem } from './menuAddonItem.entity';
import { MenuBaseItem } from './menuBaseItem.entity';

@ObjectType()
@Unique('stock_level_uniq', ['businessBaseItemId', `locationId`])
@Entity()
export class StockLevel extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((_) => Int)
  id: number;

  @Column({ type: 'integer' })
  @Index()
  @Field((_) => Int)
  businessBaseItemId: number;

  @Field((_) => BusinessBaseItem)
  @ManyToOne((_) => BusinessBaseItem)
  @JoinTable({ name: 'businessBaseItemId' })
  businessBaseItem: BusinessBaseItem;

  @Field((_) => Int)
  @Column({ type: 'integer' })
  locationId: number;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'locationId' })
  @Field((_) => Location)
  location: Location;

  // only for gql
  @OneToMany(() => MenuBaseItem, (menuBaseItem) => menuBaseItem.stock, { nullable: true })
  @Field((_) => [MenuBaseItem], { nullable: true })
  topLineItems: MenuBaseItem[];

  // only for gql
  @OneToMany(() => MenuAddonItem, (menuAddonItem) => menuAddonItem.stock)
  @Field((_) => [MenuAddonItem])
  addonItems: MenuAddonItem[];

  @Column({ type: 'integer', default: 0 })
  @Field((_) => Int)
  amount: number;
}
