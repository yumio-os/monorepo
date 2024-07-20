import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Business } from './business.entity';
import { Menu } from './menu.entity';
import { Site } from './site.entity';

@ObjectType()
export class TaxSettings {
  @Field((_) => Int, { nullable: true })
  taxRate?: number;

  @Field((_) => Boolean, { nullable: true })
  inclusive?: boolean;
}

@ObjectType()
@Entity()
export class Location extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => String)
  @Column({ length: 15 })
  name: string;

  @Field((_) => String)
  @Column({ length: 7 })
  shortName: string;

  @Field((_) => TaxSettings, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  tax: TaxSettings;

  @Field((_) => Int, { nullable: true })
  @Index()
  @Column({ type: 'integer', nullable: true })
  businessId: number;

  @ManyToOne(() => Business, { nullable: true })
  @JoinColumn({ name: 'businessId' })
  @Field((_) => Business, { nullable: true })
  business: Business;

  @Field((_) => Int, { nullable: true })
  @Index()
  @Column({ type: 'integer', nullable: true })
  siteId: number;

  @ManyToOne(() => Site, (site) => site.locations, { nullable: true })
  @JoinTable()
  @Field((_) => Site, { nullable: true })
  site: Site;

  @OneToMany((_) => Menu, (menu) => menu.location, { nullable: true })
  @Field((_) => [Menu], { defaultValue: [] })
  menus: Menu[];

  @ManyToOne((_) => Menu, { nullable: true })
  @Field((_) => Menu, { nullable: true })
  activeMenu?: Menu;

  @Field((_) => Int, { nullable: true })
  @Index()
  @Column({ type: 'integer', nullable: true })
  activeMenuId: number;
}
