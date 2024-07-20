import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Brand, BrandBaseItem } from './brand.entity';
import { Business } from './business.entity';
import { MenuBaseItem } from './menuBaseItem.entity';

@ObjectType()
export class ItemImages {
  @Field((_) => String, { nullable: true })
  default?: string;

  @Field((_) => String, { nullable: true })
  defaultLowRes: string;

  @Field((_) => String, { nullable: true })
  thumbnail: string;

  @Field((_) => String, { nullable: true })
  thumbnailLowRes: string;
}

@ObjectType()
export class ItemDiscountSettings {
  @Field((_) => Int, { nullable: true })
  amount?: number;

  @Field((_) => Int, { nullable: true })
  amountPer?: number;

  @Field((_) => Int, { nullable: true })
  maxDiscount?: number;

  @Field((_) => Int, { nullable: true })
  maxDiscountPer?: number;
}

@ObjectType()
@Entity()
@Unique('uniq_sku_brand_id_business_item', ['sku', 'businessId'])
export class BusinessBaseItem extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => String)
  @Column({ length: 20 })
  name: string;

  @Field((_) => Int, { nullable: true })
  @Index()
  @Column({ type: 'integer', nullable: true })
  brandId?: number;

  @ManyToOne(() => Brand, { nullable: true })
  @JoinColumn({ name: 'brandId' })
  @Field((_) => Brand, { nullable: true })
  brand?: Brand;

  @Field((_) => Int, { nullable: true })
  @Index()
  @Column({ type: 'integer', nullable: true })
  brandBaseItemId?: number;

  @ManyToOne(() => BrandBaseItem, { nullable: true })
  @JoinColumn({ name: 'brandBaseItemId' })
  @Field((_) => BrandBaseItem, { nullable: true })
  brandBaseItem?: BrandBaseItem;

  @Field((_) => Int)
  @Index()
  @Column({ type: 'integer' })
  businessId: number;

  @ManyToOne(() => Business)
  @JoinColumn({ name: 'businessId' })
  @Field((_) => Business)
  business: Business;

  // todo menus
  @OneToMany(() => MenuBaseItem, (menuBaseItem) => menuBaseItem.businessBaseItem, {
    nullable: true,
  })
  @Field((_) => [MenuBaseItem], { defaultValue: [] })
  menuItems: MenuBaseItem[];

  @Field((_) => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field((_) => ItemImages, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  images?: ItemImages;

  @Field((_) => String, { nullable: true })
  @Column({ nullable: true })
  sku?: string;

  @Field((_) => Int)
  @Column({ type: 'integer' })
  price: number;

  @Field((_) => Boolean, { defaultValue: true })
  @Column({ type: 'boolean', default: true })
  allowAsModfier: boolean;

  @Field((_) => Boolean, { defaultValue: true })
  @Column({ type: 'boolean', default: true })
  allowAsAddon: boolean;

  @Field((_) => Boolean, { defaultValue: true })
  @Column({ type: 'boolean', default: true })
  excludeFromTop: Boolean;
}
