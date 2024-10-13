import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PaginationMeta } from '@yumio/common/pagination';
import { ItemDiscountSettings, ItemImages, TagType, TaxSettings } from '@yumio/modules/core';

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

  @Field((_) => ItemImages, { nullable: true })
  images?: ItemImages;
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

  @Field((_) => String)
  currencyCode: string;

  @Field((_) => String)
  currencySymbol: string;
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
export class OPTopLineItemsWithPagination {
  @Field((_) => [OPTopLineItem])
  items: OPTopLineItem[];

  @Field((_) => PaginationMeta)
  pagination: PaginationMeta;
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

  @Field((_) => [OPTagMenu], { defaultValue: [] })
  tags: OPTagMenu[];

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

@ObjectType()
export class OPTag {
  @Field((_) => Int)
  id: number;

  @Field((_) => String)
  name: string;

  @Field((_) => ItemImages, { nullable: true })
  images?: ItemImages;

  @Field((_) => TagType)
  type?: TagType;
}

@ObjectType()
export class OPTagMenu {
  @Field((_) => Int)
  id: number;

  @Field((_) => String)
  name: string;

  @Field((_) => OPTag)
  tag: OPTag;

  @Field((_) => ItemImages, { nullable: true })
  images?: ItemImages;

  @Field((_) => Int, { defaultValue: 0 })
  position?: number;
}
