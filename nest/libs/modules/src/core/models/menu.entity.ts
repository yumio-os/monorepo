import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Business } from './business.entity';
import { ItemImages } from './businessBaseItem.entity';
import { Location } from './location.entity';
import { MenuBaseItem } from './menuBaseItem.entity';

@ObjectType()
@Entity()
export class Menu extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => String)
  @Column({ length: 30 })
  name: string;

  @Field((_) => Int)
  @Index()
  @Column({ type: 'integer' })
  businessId: number;

  @ManyToOne(() => Business)
  @JoinColumn({ name: 'businessId' })
  @Field((_) => Business)
  business: Business;

  @Field((_) => Int)
  @Column({ type: 'integer' })
  locationId: number;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'locationId' })
  @Field((_) => Location)
  location: Location;

  // @Field((_) => DeliveryPlatformSwitch)
  // @Column({ type: 'jsonb', nullable: true })
  // storefronts: DeliveryPlatformSwitch;

  @Field((_) => ItemImages, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  images?: ItemImages;

  @OneToMany((_) => MenuBaseItem, (item) => item.menu, { nullable: true })
  @Field((_) => [MenuBaseItem], { defaultValue: [] })
  items: MenuBaseItem[];

  @Column({ type: 'bool', default: false })
  @Field((_) => Boolean, { defaultValue: false })
  default: boolean;
}
