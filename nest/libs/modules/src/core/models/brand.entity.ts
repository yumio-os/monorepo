import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Business } from './business.entity';
import { ItemImages } from './businessBaseItem.entity';

@Entity()
@ObjectType()
export class Brand extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => String)
  @Column({ length: 20 })
  name: string;

  @Field((_) => String)
  @Column({ length: 7 })
  shortName: string;

  // todo manually make that realation
  @ManyToMany(() => Business, (business) => business.brands, { nullable: true })
  @Field((_) => [Business])
  businesses: Business[];

  @OneToMany(() => BrandBaseItem, (brandBaseItems) => brandBaseItems.brand)
  @Field((_) => [BrandBaseItem])
  brandBaseItems: BrandBaseItem[];

  @Field((_) => ItemImages, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  images?: ItemImages;
}

@ObjectType()
@Unique('uniq_sku_brand_item', ['sku', 'brandId'])
@Entity()
export class BrandBaseItem extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => String)
  @Column({ length: 20 })
  name: string;

  @Field((_) => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field((_) => ItemImages, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  images?: ItemImages;

  @Field((_) => String)
  @Index()
  @Column({})
  sku: string;

  @Field((_) => Int, { nullable: true })
  @Column({ type: 'integer', nullable: true })
  suggestedPrice?: number;

  @Field((_) => Int)
  @Index()
  @Column({ type: 'integer' })
  brandId: number;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brandId' })
  @Field((_) => Brand)
  brand: Brand;
}
