import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Brand } from './brand.entity';
import { BusinessBaseItem } from './businessBaseItem.entity';
import { Location } from './location.entity';
import { Menu } from './menu.entity';

@ObjectType()
@Entity()
export class Business extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => String)
  @Column({ length: 20 })
  name: string;

  @Field((_) => String)
  @Column({ length: 7 })
  shortName: string;

  // Many to many relationship to Brands
  // todo manually make that realation
  @ManyToMany(() => Brand, (brand) => brand.businesses, { nullable: true })
  // @JoinTable() // This decorator specifies that this is the owner side of the relationship
  @JoinTable({
    name: 'business_to_brand',
    joinColumn: { referencedColumnName: 'id' },
    inverseJoinColumn: { referencedColumnName: 'id' },
  })
  @Field((_) => [Brand], { defaultValue: [] })
  brands: Brand[];

  @OneToMany(() => Location, (location) => location.business, { nullable: true })
  @JoinTable() // This decorator specifies that this is the owner side of the relationship
  @Field((_) => [Location], { defaultValue: [] })
  locations: Location[];

  @OneToMany(() => Menu, (menu) => menu.business, { nullable: true })
  @JoinTable() // This decorator specifies that this is the owner side of the relationship
  @Field((_) => [Menu], { defaultValue: [] })
  menus: Menu[];

  @OneToMany(() => BusinessBaseItem, (baseItem) => baseItem.business, { nullable: true })
  @JoinTable() // This decorator specifies that this is the owner side of the relationship
  @Field((_) => [BusinessBaseItem], { defaultValue: [] })
  items: BusinessBaseItem[];
}
