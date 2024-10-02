import { BaseEntity, Column, Entity, Index, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import { ItemImages } from './businessBaseItem.entity';
import { MenuAddonItem } from './menuAddonItem.entity';
import { MenuBaseItem } from './menuBaseItem.entity';

export enum AddonType {
  modifier = 'modifier',
  addon = 'addon',
}

export const AddonTypeRegistered = registerEnumType(AddonType, {
  name: 'AddonType',
  valuesMap: {
    modifier: {
      description: 'modifier',
    },
    addon: {
      description: 'addon',
    },
  },
});

@ObjectType()
export class MenuAddonLogic {
  @Field((_) => Int, { defaultValue: 0 })
  min: number;

  @Field((_) => Int, { defaultValue: 1 })
  max: number;

  @Field((_) => Boolean, { defaultValue: true })
  repeat: boolean;
}

function defMenuAddonLogic() {
  const defaultMenuAddonLogic = new MenuAddonLogic();
  return defMenuAddonLogic;
}

@ObjectType()
@Entity()
export class MenuAddon extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { type: 'bigint' }) // TOOD MOVE ALL TO BIG INTS
  id: number;

  @Field((_) => String, { nullable: true })
  @Column({ length: 20, nullable: true })
  name?: string;

  @Column({ type: 'simple-enum', enum: AddonType, default: AddonType.modifier })
  @Field((_) => AddonType, { defaultValue: AddonType.modifier })
  type: AddonType;

  @Field((_) => String, { nullable: true })
  @Column({ length: 20, nullable: true })
  description?: string;

  @Field((_) => ItemImages, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  images?: ItemImages;

  @Field((_) => Int, { defaultValue: 0 })
  @Column({ type: 'int', nullable: true })
  position: number;

  @Field((_) => [MenuAddonItem], { defaultValue: [] })
  @OneToMany((_) => MenuAddonItem, (menuAddonItem) => menuAddonItem.menuAddon, { nullable: true })
  @JoinTable()
  items: MenuAddonItem[];

  @Field((_) => MenuAddonLogic)
  @Column({ type: 'jsonb', nullable: true })
  logic: MenuAddonLogic;

  @Column({ type: 'int' })
  @Index()
  @Field((_) => Int)
  menuBaseItemId: number;

  @ManyToOne((_) => MenuBaseItem, (menuBaseItem) => menuBaseItem.addons)
  @Field((_) => MenuBaseItem)
  menuBaseItem: MenuBaseItem;
}
