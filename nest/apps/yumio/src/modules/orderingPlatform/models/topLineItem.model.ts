import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ItemDiscountSettings, ItemImages, TagMenu, TaxSettings } from '@yumio/modules/core';

@ObjectType()
export class OPBrand {
  @Field((_) => Int)
  id: number;

  @Field((_) => String)
  name: string;

  @Field((_) => String)
  shortName: string;

  @Field((_) => ItemImages, { nullable: true })
  images?: ItemImages;
}

@ObjectType()
export class OPBusiness {
  @Field((_) => Int)
  id: number;

  @Field((_) => String)
  name: string;

  @Field((_) => String)
  shortName: string;
}

@ObjectType()
export class OPSite {
  @Field((_) => Int)
  id: number;

  @Field((_) => String)
  name: string;

  @Field((_) => String)
  shortName: string;

  @Field((_) => ItemImages, { nullable: true })
  images?: ItemImages;
}

@ObjectType()
export class OPBusinessBaseItem {
  @Field((_) => Int)
  id: number;

  @Field((_) => Int, { nullable: true })
  brandId?: number;

  @Field((_) => Int)
  businessId: number;

  @Field((_) => String, { nullable: true })
  sku?: string;

  @Field((_) => Boolean, { defaultValue: true })
  allowAsModfier: boolean;

  @Field((_) => Boolean, { defaultValue: true })
  allowAsAddon: boolean;

  @Field((_) => Boolean, { defaultValue: true })
  excludeFromTop: Boolean;
}

@ObjectType()
export class OPStockLevel {
  @Field((_) => Int)
  id: number;

  @Field((_) => Int)
  amount: number;
}

@ObjectType()
export class OPTopLineItem {
  @Field((_) => Int)
  id: number;

  @Field((_) => Int)
  businessBaseItemId: number;

  @Field((_) => OPBusinessBaseItem)
  businessBaseItem: OPBusinessBaseItem; // throygh resolve field

  @Field((_) => Int)
  menuId: number;

  @Field((_) => Boolean, { defaultValue: false })
  hasAddons: boolean; // modifier+adon

  //   @Field((_) => [OPTag], { defaultValue: [] }) // too small todo resolve field, do through join
  //   tags: OPTag[];

  // overrides
  @Field((_) => String, { nullable: true })
  name?: string;

  @Field((_) => String, { nullable: true })
  description?: string;

  @Field((_) => ItemImages, { nullable: true })
  images?: ItemImages;

  @Field((_) => Int, { nullable: true })
  price?: number;

  @Field((_) => ItemDiscountSettings, { nullable: true })
  discount: ItemDiscountSettings;

  @Field((_) => Int, { defaultValue: 0 })
  position: number;

  // ===== take from join
  @Field((_) => OPStockLevel, { nullable: true })
  stock: OPStockLevel;

  @Field((_) => [TagMenu], { defaultValue: [] })
  tags: TagMenu[];

  @Field((_) => TaxSettings, { nullable: true })
  tax: TaxSettings;
}

@ObjectType()
export class OPMenu {
  @Field((_) => Int)
  id: number;

  @Field((_) => String)
  name: string;

  @Field((_) => Int)
  businessId: number;

  @Field((_) => [OPTopLineItem], { defaultValue: [] })
  items: OPTopLineItem[];
}

@ObjectType()
export class OPLocation {
  @Field((_) => Int)
  id: number;

  @Field((_) => String)
  name: string;

  @Field((_) => String)
  shortName: string;

  @Field((_) => [OPMenu], { defaultValue: [] })
  menus: OPMenu[];

  @Field((_) => TaxSettings, { nullable: true })
  tax?: TaxSettings;

  @Field((_) => Int)
  businessId: number;
}
