import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { BusinessBaseItem } from './businessBaseItem.entity';
import { MenuAddon } from './menuAddons.entity';
import { StockLevel } from './stock.entity';

@ObjectType()
@Entity()
export class MenuAddonItem extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Field((_) => Int)
  @Index()
  @Column({ type: 'integer' })
  businessBaseItemId: number;

  @ManyToOne(() => BusinessBaseItem, (businessBaseItem) => businessBaseItem)
  @JoinColumn({ name: 'businessBaseItemId' })
  @Field((_) => BusinessBaseItem)
  businessBaseItem: BusinessBaseItem;

  @Field((_) => Int, { defaultValue: 0 })
  @Column({ type: 'int', nullable: true })
  position: number;

  @Index()
  @Field((_) => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  stockId?: number;

  @ManyToOne((_) => StockLevel, { nullable: true })
  @JoinColumn({ name: 'stockId' })
  @Field((_) => StockLevel, { nullable: true })
  stock?: StockLevel;

  // overrides
  @Field((_) => String, { nullable: true })
  @Column({ length: 20, nullable: true })
  name?: string;

  @Field((_) => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  price?: number;

  @Column({ type: 'int' })
  @Index()
  @Field((_) => Int)
  menuAddonId: number;

  @ManyToOne((_) => MenuAddon, (menuAddon) => menuAddon.items)
  @Field((_) => MenuAddon)
  menuAddon: MenuAddon;
}
