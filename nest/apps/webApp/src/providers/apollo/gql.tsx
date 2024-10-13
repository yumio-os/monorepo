import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
  PhoneNumber: { input: any; output: any; }
};

export enum AddonType {
  /** addon */
  Addon = 'addon',
  /** modifier */
  Modifier = 'modifier'
}

export type App = {
  __typename?: 'App';
  activeProfile: Scalars['String']['output'];
  name: Scalars['String']['output'];
  version: Scalars['String']['output'];
};

export type Brand = {
  __typename?: 'Brand';
  brandBaseItems: Array<BrandBaseItem>;
  businesses: Array<Business>;
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type BrandBaseItem = {
  __typename?: 'BrandBaseItem';
  brand: Brand;
  brandId: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  name: Scalars['String']['output'];
  sku: Scalars['String']['output'];
  suggestedPrice?: Maybe<Scalars['Int']['output']>;
};

export type Business = {
  __typename?: 'Business';
  brands: Array<Brand>;
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  items: Array<BusinessBaseItem>;
  locations: Array<Location>;
  menus: Array<Menu>;
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type BusinessBaseItem = {
  __typename?: 'BusinessBaseItem';
  allowAsAddon: Scalars['Boolean']['output'];
  allowAsModfier: Scalars['Boolean']['output'];
  brand?: Maybe<Brand>;
  brandBaseItem?: Maybe<BrandBaseItem>;
  brandBaseItemId?: Maybe<Scalars['Int']['output']>;
  brandId?: Maybe<Scalars['Int']['output']>;
  business: Business;
  businessId: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  excludeFromTop: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  menuItems: Array<MenuBaseItem>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  sku?: Maybe<Scalars['String']['output']>;
};

export type DeliveryPlatform = {
  __typename?: 'DeliveryPlatform';
  id: Scalars['Int']['output'];
  integration: IntegrationType;
  locations: Array<DeliveryPlatformLocation>;
  name: Scalars['String']['output'];
};

export type DeliveryPlatformLocation = {
  __typename?: 'DeliveryPlatformLocation';
  default: Scalars['Boolean']['output'];
  deliveryPlatform: DeliveryPlatform;
  deliveryPlatformId: Scalars['Int']['output'];
  externalMenu?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['Int']['output'];
  location: Location;
  locationId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  status: DpStatus;
};

export enum DpStatus {
  /** live */
  Live = 'live',
  /** new */
  New = 'new',
  /** offline */
  Offline = 'offline',
  /** pendingLive */
  PendingLive = 'pendingLive',
  /** pendingOffline */
  PendingOffline = 'pendingOffline'
}

export enum IntegrationType {
  App = 'app',
  JustEat = 'justEat',
  Kiosk = 'kiosk',
  Pos = 'pos',
  Web = 'web'
}

export type ItemDiscountSettings = {
  __typename?: 'ItemDiscountSettings';
  amount?: Maybe<Scalars['Int']['output']>;
  amountPer?: Maybe<Scalars['Int']['output']>;
  maxDiscount?: Maybe<Scalars['Int']['output']>;
  maxDiscountPer?: Maybe<Scalars['Int']['output']>;
};

export type ItemImages = {
  __typename?: 'ItemImages';
  default?: Maybe<Scalars['String']['output']>;
  defaultLowRes?: Maybe<Scalars['String']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  thumbnailLowRes?: Maybe<Scalars['String']['output']>;
};

export type Location = {
  __typename?: 'Location';
  activeMenu?: Maybe<Menu>;
  activeMenuId?: Maybe<Scalars['Int']['output']>;
  business?: Maybe<Business>;
  businessId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  menus: Array<Menu>;
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  site?: Maybe<Site>;
  siteId?: Maybe<Scalars['Int']['output']>;
  tax?: Maybe<TaxSettings>;
};

export type Menu = {
  __typename?: 'Menu';
  business: Business;
  businessId: Scalars['Int']['output'];
  default: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  items: Array<MenuBaseItem>;
  location: Location;
  locationId: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type MenuAddon = {
  __typename?: 'MenuAddon';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  items: Array<MenuAddonItem>;
  logic: MenuAddonLogic;
  menuBaseItem: MenuBaseItem;
  menuBaseItemId: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  type: AddonType;
};

export type MenuAddonItem = {
  __typename?: 'MenuAddonItem';
  businessBaseItem: BusinessBaseItem;
  businessBaseItemId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  menuAddon: MenuAddon;
  menuAddonId: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  price?: Maybe<Scalars['Int']['output']>;
  stock?: Maybe<StockLevel>;
  stockId?: Maybe<Scalars['Int']['output']>;
};

export type MenuAddonLogic = {
  __typename?: 'MenuAddonLogic';
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
  repeat: Scalars['Boolean']['output'];
};

export type MenuBaseItem = {
  __typename?: 'MenuBaseItem';
  addons: Array<MenuAddon>;
  businessBaseItem: BusinessBaseItem;
  businessBaseItemId: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<ItemDiscountSettings>;
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  menu: Menu;
  menuId: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  price: Scalars['Int']['output'];
  stock?: Maybe<StockLevel>;
  stockId?: Maybe<Scalars['Int']['output']>;
  tags: Array<TagMenu>;
  tax?: Maybe<TaxSettings>;
};

export type OpBrand = {
  __typename?: 'OPBrand';
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type OpBusiness = {
  __typename?: 'OPBusiness';
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type OpBusinessBaseItem = {
  __typename?: 'OPBusinessBaseItem';
  allowAsAddon: Scalars['Boolean']['output'];
  allowAsModfier: Scalars['Boolean']['output'];
  brandId?: Maybe<Scalars['Int']['output']>;
  businessId: Scalars['Int']['output'];
  excludeFromTop: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  sku?: Maybe<Scalars['String']['output']>;
};

export type OpMenu = {
  __typename?: 'OPMenu';
  businessId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  items: Array<OpTopLineItem>;
  name: Scalars['String']['output'];
};

export type OpSite = {
  __typename?: 'OPSite';
  currencyCode: Scalars['String']['output'];
  currencySymbol: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type OpStockLevel = {
  __typename?: 'OPStockLevel';
  amount: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type OpTag = {
  __typename?: 'OPTag';
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  name: Scalars['String']['output'];
  type: TagType;
};

export type OpTagMenu = {
  __typename?: 'OPTagMenu';
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  tag: OpTag;
};

export type OpTopLineItem = {
  __typename?: 'OPTopLineItem';
  businessBaseItem: OpBusinessBaseItem;
  businessBaseItemId: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<ItemDiscountSettings>;
  hasAddons: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  menuId: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  price?: Maybe<Scalars['Int']['output']>;
  stock?: Maybe<OpStockLevel>;
  tags: Array<OpTagMenu>;
  tax?: Maybe<TaxSettings>;
};

export type OpTopLineItemsWithPagination = {
  __typename?: 'OPTopLineItemsWithPagination';
  items: Array<OpTopLineItem>;
  pagination: PaginationMeta;
};

export type Pagination = {
  page?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  page: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  app: App;
  coreBrand?: Maybe<Brand>;
  coreBrandBaseItem?: Maybe<BrandBaseItem>;
  coreBusiness?: Maybe<Business>;
  coreBusinessBaseItem?: Maybe<BusinessBaseItem>;
  coreLocation?: Maybe<Location>;
  coreMenu?: Maybe<Menu>;
  coreMenuBaseItem?: Maybe<MenuBaseItem>;
  coreSite?: Maybe<Site>;
  coreTag?: Maybe<Tag>;
  opItemsInActiveMenu: OpTopLineItemsWithPagination;
  opItemsInLocation: OpTopLineItemsWithPagination;
  opItemsInLocationForCollection: OpTopLineItemsWithPagination;
  opItemsInMenu: OpTopLineItemsWithPagination;
  opItemsInMenuForCollection: OpTopLineItemsWithPagination;
  opItemsInSite: OpTopLineItemsWithPagination;
  opItemsInSiteBrandForCollection: OpTopLineItemsWithPagination;
  opItemsInSiteForBrand: OpTopLineItemsWithPagination;
  opItemsInSiteForCollection: OpTopLineItemsWithPagination;
  opSite: OpSite;
  opSiteBrands: Array<OpBrand>;
  opSiteBusiness: Array<OpBusiness>;
  opSiteMenuTags: Array<OpTagMenu>;
  opSiteTags: Array<OpTag>;
};


export type QueryCoreBrandArgs = {
  brandId: Scalars['Int']['input'];
};


export type QueryCoreBrandBaseItemArgs = {
  brandBaseItemById: Scalars['Int']['input'];
};


export type QueryCoreBusinessArgs = {
  businessId: Scalars['Int']['input'];
};


export type QueryCoreBusinessBaseItemArgs = {
  businessBaseItemId: Scalars['Int']['input'];
};


export type QueryCoreLocationArgs = {
  locationId: Scalars['Int']['input'];
};


export type QueryCoreMenuArgs = {
  menuId: Scalars['Int']['input'];
};


export type QueryCoreMenuBaseItemArgs = {
  itemId: Scalars['Int']['input'];
};


export type QueryCoreSiteArgs = {
  siteId: Scalars['Int']['input'];
};


export type QueryCoreTagArgs = {
  tagId: Scalars['Int']['input'];
};


export type QueryOpItemsInActiveMenuArgs = {
  menuId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
};


export type QueryOpItemsInLocationArgs = {
  locationId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
};


export type QueryOpItemsInLocationForCollectionArgs = {
  locationId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
  tagMenuId: Scalars['Int']['input'];
};


export type QueryOpItemsInMenuArgs = {
  menuId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
};


export type QueryOpItemsInMenuForCollectionArgs = {
  menuId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
  tagMenuId: Scalars['Int']['input'];
};


export type QueryOpItemsInSiteArgs = {
  pagination?: Pagination;
  siteId: Scalars['Int']['input'];
};


export type QueryOpItemsInSiteBrandForCollectionArgs = {
  brandId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
  siteId: Scalars['Int']['input'];
  tagMenuId: Scalars['Int']['input'];
};


export type QueryOpItemsInSiteForBrandArgs = {
  brandId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
  siteId: Scalars['Int']['input'];
};


export type QueryOpItemsInSiteForCollectionArgs = {
  pagination?: InputMaybe<Pagination>;
  siteId: Scalars['Int']['input'];
  tagMenuId: Scalars['Int']['input'];
};


export type QueryOpSiteArgs = {
  siteId: Scalars['Int']['input'];
};


export type QueryOpSiteBrandsArgs = {
  siteId: Scalars['Int']['input'];
};


export type QueryOpSiteBusinessArgs = {
  siteId: Scalars['Int']['input'];
};


export type QueryOpSiteMenuTagsArgs = {
  siteId: Scalars['Int']['input'];
  type?: InputMaybe<TagType>;
};


export type QueryOpSiteTagsArgs = {
  siteId: Scalars['Int']['input'];
  type?: InputMaybe<TagType>;
};

export type Site = {
  __typename?: 'Site';
  currencyCode: Scalars['String']['output'];
  currencySymbol: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  locations: Array<Location>;
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type StockLevel = {
  __typename?: 'StockLevel';
  addonItems: Array<MenuAddonItem>;
  amount: Scalars['Int']['output'];
  businessBaseItem: BusinessBaseItem;
  businessBaseItemId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  location: Location;
  locationId: Scalars['Int']['output'];
  topLineItems?: Maybe<Array<MenuBaseItem>>;
};

export type StripeReaderAction = {
  __typename?: 'StripeReaderAction';
  failureCode?: Maybe<Scalars['String']['output']>;
  failureMessage?: Maybe<Scalars['String']['output']>;
  processPaymentIntent?: Maybe<Scalars['JSON']['output']>;
  processSetupIntent?: Maybe<Scalars['JSON']['output']>;
  refundPayment?: Maybe<Scalars['JSON']['output']>;
  set_reader_display?: Maybe<Scalars['JSON']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type StripeReaderBase = {
  __typename?: 'StripeReaderBase';
  deviceSwVersion?: Maybe<Scalars['String']['output']>;
  deviceType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  object: Scalars['String']['output'];
  serialNumber: Scalars['String']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  name: Scalars['String']['output'];
  tagMenu: Array<TagMenu>;
  type: TagType;
};

export type TagMenu = {
  __typename?: 'TagMenu';
  id: Scalars['Int']['output'];
  images?: Maybe<ItemImages>;
  menu: Menu;
  menuId?: Maybe<Scalars['Int']['output']>;
  menuItems: Array<MenuBaseItem>;
  name?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['Int']['output']>;
  tag: Tag;
  tagId?: Maybe<Scalars['Int']['output']>;
};

export enum TagType {
  /** category */
  Category = 'category',
  /** collection */
  Collection = 'collection'
}

export type TaxSettings = {
  __typename?: 'TaxSettings';
  inclusive?: Maybe<Scalars['Boolean']['output']>;
  taxRate?: Maybe<Scalars['Int']['output']>;
};

export type OpItemsInActiveMenuQueryVariables = Exact<{
  menuId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
}>;


export type OpItemsInActiveMenuQuery = { __typename?: 'Query', itemsWithPagination: { __typename?: 'OPTopLineItemsWithPagination', items: Array<{ __typename?: 'OPTopLineItem', id: number, hasAddons: boolean, description?: string | null, businessBaseItemId: number, menuId: number, name?: string | null, position: number, price?: number | null, discount?: { __typename?: 'ItemDiscountSettings', amount?: number | null, amountPer?: number | null, maxDiscount?: number | null, maxDiscountPer?: number | null } | null, images?: { __typename?: 'ItemImages', thumbnailLowRes?: string | null, thumbnail?: string | null, defaultLowRes?: string | null, default?: string | null } | null, stock?: { __typename?: 'OPStockLevel', id: number, amount: number } | null, businessBaseItem: { __typename?: 'OPBusinessBaseItem', brandId?: number | null, allowAsModfier: boolean, allowAsAddon: boolean, businessId: number, excludeFromTop: boolean, sku?: string | null }, tags: Array<{ __typename?: 'OPTagMenu', id: number, position: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null, defaultLowRes?: string | null, thumbnail?: string | null, thumbnailLowRes?: string | null } | null, tag: { __typename?: 'OPTag', type: TagType } }>, tax?: { __typename?: 'TaxSettings', inclusive?: boolean | null, taxRate?: number | null } | null }>, pagination: { __typename?: 'PaginationMeta', size: number, page: number, totalCount: number } } };

export type OpItemsInLocationQueryVariables = Exact<{
  locationId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
}>;


export type OpItemsInLocationQuery = { __typename?: 'Query', itemsWithPagination: { __typename?: 'OPTopLineItemsWithPagination', items: Array<{ __typename?: 'OPTopLineItem', id: number, hasAddons: boolean, description?: string | null, businessBaseItemId: number, menuId: number, name?: string | null, position: number, price?: number | null, discount?: { __typename?: 'ItemDiscountSettings', amount?: number | null, amountPer?: number | null, maxDiscount?: number | null, maxDiscountPer?: number | null } | null, images?: { __typename?: 'ItemImages', thumbnailLowRes?: string | null, thumbnail?: string | null, defaultLowRes?: string | null, default?: string | null } | null, stock?: { __typename?: 'OPStockLevel', id: number, amount: number } | null, businessBaseItem: { __typename?: 'OPBusinessBaseItem', brandId?: number | null, allowAsModfier: boolean, allowAsAddon: boolean, businessId: number, excludeFromTop: boolean, sku?: string | null }, tags: Array<{ __typename?: 'OPTagMenu', id: number, position: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null, defaultLowRes?: string | null, thumbnail?: string | null, thumbnailLowRes?: string | null } | null, tag: { __typename?: 'OPTag', type: TagType } }>, tax?: { __typename?: 'TaxSettings', inclusive?: boolean | null, taxRate?: number | null } | null }>, pagination: { __typename?: 'PaginationMeta', size: number, page: number, totalCount: number } } };

export type OpItemsInSiteQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
}>;


export type OpItemsInSiteQuery = { __typename?: 'Query', itemsWithPagination: { __typename?: 'OPTopLineItemsWithPagination', items: Array<{ __typename?: 'OPTopLineItem', id: number, hasAddons: boolean, description?: string | null, businessBaseItemId: number, menuId: number, name?: string | null, position: number, price?: number | null, discount?: { __typename?: 'ItemDiscountSettings', amount?: number | null, amountPer?: number | null, maxDiscount?: number | null, maxDiscountPer?: number | null } | null, images?: { __typename?: 'ItemImages', thumbnailLowRes?: string | null, thumbnail?: string | null, defaultLowRes?: string | null, default?: string | null } | null, stock?: { __typename?: 'OPStockLevel', id: number, amount: number } | null, businessBaseItem: { __typename?: 'OPBusinessBaseItem', brandId?: number | null, allowAsModfier: boolean, allowAsAddon: boolean, businessId: number, excludeFromTop: boolean, sku?: string | null }, tags: Array<{ __typename?: 'OPTagMenu', id: number, position: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null, defaultLowRes?: string | null, thumbnail?: string | null, thumbnailLowRes?: string | null } | null, tag: { __typename?: 'OPTag', type: TagType } }>, tax?: { __typename?: 'TaxSettings', inclusive?: boolean | null, taxRate?: number | null } | null }>, pagination: { __typename?: 'PaginationMeta', size: number, page: number, totalCount: number } } };

export type OpItemsInSiteForBrandQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
  brandId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
}>;


export type OpItemsInSiteForBrandQuery = { __typename?: 'Query', itemsWithPagination: { __typename?: 'OPTopLineItemsWithPagination', items: Array<{ __typename?: 'OPTopLineItem', id: number, hasAddons: boolean, description?: string | null, businessBaseItemId: number, menuId: number, name?: string | null, position: number, price?: number | null, discount?: { __typename?: 'ItemDiscountSettings', amount?: number | null, amountPer?: number | null, maxDiscount?: number | null, maxDiscountPer?: number | null } | null, images?: { __typename?: 'ItemImages', thumbnailLowRes?: string | null, thumbnail?: string | null, defaultLowRes?: string | null, default?: string | null } | null, stock?: { __typename?: 'OPStockLevel', id: number, amount: number } | null, businessBaseItem: { __typename?: 'OPBusinessBaseItem', brandId?: number | null, allowAsModfier: boolean, allowAsAddon: boolean, businessId: number, excludeFromTop: boolean, sku?: string | null }, tags: Array<{ __typename?: 'OPTagMenu', id: number, position: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null, defaultLowRes?: string | null, thumbnail?: string | null, thumbnailLowRes?: string | null } | null, tag: { __typename?: 'OPTag', type: TagType } }>, tax?: { __typename?: 'TaxSettings', inclusive?: boolean | null, taxRate?: number | null } | null }>, pagination: { __typename?: 'PaginationMeta', size: number, page: number, totalCount: number } } };

export type OpItemsInSiteForCollectionQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
  tagMenuId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
}>;


export type OpItemsInSiteForCollectionQuery = { __typename?: 'Query', itemsWithPagination: { __typename?: 'OPTopLineItemsWithPagination', items: Array<{ __typename?: 'OPTopLineItem', id: number, hasAddons: boolean, description?: string | null, businessBaseItemId: number, menuId: number, name?: string | null, position: number, price?: number | null, discount?: { __typename?: 'ItemDiscountSettings', amount?: number | null, amountPer?: number | null, maxDiscount?: number | null, maxDiscountPer?: number | null } | null, images?: { __typename?: 'ItemImages', thumbnailLowRes?: string | null, thumbnail?: string | null, defaultLowRes?: string | null, default?: string | null } | null, stock?: { __typename?: 'OPStockLevel', id: number, amount: number } | null, businessBaseItem: { __typename?: 'OPBusinessBaseItem', brandId?: number | null, allowAsModfier: boolean, allowAsAddon: boolean, businessId: number, excludeFromTop: boolean, sku?: string | null }, tags: Array<{ __typename?: 'OPTagMenu', id: number, position: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null, defaultLowRes?: string | null, thumbnail?: string | null, thumbnailLowRes?: string | null } | null, tag: { __typename?: 'OPTag', type: TagType } }>, tax?: { __typename?: 'TaxSettings', inclusive?: boolean | null, taxRate?: number | null } | null }>, pagination: { __typename?: 'PaginationMeta', size: number, page: number, totalCount: number } } };

export type OpItemsInLocationForCollectionQueryVariables = Exact<{
  locationId: Scalars['Int']['input'];
  tagMenuId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
}>;


export type OpItemsInLocationForCollectionQuery = { __typename?: 'Query', itemsWithPagination: { __typename?: 'OPTopLineItemsWithPagination', items: Array<{ __typename?: 'OPTopLineItem', id: number, hasAddons: boolean, description?: string | null, businessBaseItemId: number, menuId: number, name?: string | null, position: number, price?: number | null, discount?: { __typename?: 'ItemDiscountSettings', amount?: number | null, amountPer?: number | null, maxDiscount?: number | null, maxDiscountPer?: number | null } | null, images?: { __typename?: 'ItemImages', thumbnailLowRes?: string | null, thumbnail?: string | null, defaultLowRes?: string | null, default?: string | null } | null, stock?: { __typename?: 'OPStockLevel', id: number, amount: number } | null, businessBaseItem: { __typename?: 'OPBusinessBaseItem', brandId?: number | null, allowAsModfier: boolean, allowAsAddon: boolean, businessId: number, excludeFromTop: boolean, sku?: string | null }, tags: Array<{ __typename?: 'OPTagMenu', id: number, position: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null, defaultLowRes?: string | null, thumbnail?: string | null, thumbnailLowRes?: string | null } | null, tag: { __typename?: 'OPTag', type: TagType } }>, tax?: { __typename?: 'TaxSettings', inclusive?: boolean | null, taxRate?: number | null } | null }>, pagination: { __typename?: 'PaginationMeta', size: number, page: number, totalCount: number } } };

export type OpItemsInMenuForCollectionQueryVariables = Exact<{
  menuId: Scalars['Int']['input'];
  tagMenuId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
}>;


export type OpItemsInMenuForCollectionQuery = { __typename?: 'Query', itemsWithPagination: { __typename?: 'OPTopLineItemsWithPagination', items: Array<{ __typename?: 'OPTopLineItem', id: number, hasAddons: boolean, description?: string | null, businessBaseItemId: number, menuId: number, name?: string | null, position: number, price?: number | null, discount?: { __typename?: 'ItemDiscountSettings', amount?: number | null, amountPer?: number | null, maxDiscount?: number | null, maxDiscountPer?: number | null } | null, images?: { __typename?: 'ItemImages', thumbnailLowRes?: string | null, thumbnail?: string | null, defaultLowRes?: string | null, default?: string | null } | null, stock?: { __typename?: 'OPStockLevel', id: number, amount: number } | null, businessBaseItem: { __typename?: 'OPBusinessBaseItem', brandId?: number | null, allowAsModfier: boolean, allowAsAddon: boolean, businessId: number, excludeFromTop: boolean, sku?: string | null }, tags: Array<{ __typename?: 'OPTagMenu', id: number, position: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null, defaultLowRes?: string | null, thumbnail?: string | null, thumbnailLowRes?: string | null } | null, tag: { __typename?: 'OPTag', type: TagType } }>, tax?: { __typename?: 'TaxSettings', inclusive?: boolean | null, taxRate?: number | null } | null }>, pagination: { __typename?: 'PaginationMeta', size: number, page: number, totalCount: number } } };

export type OpItemsInSiteBrandForCollectionQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
  brandId: Scalars['Int']['input'];
  tagMenuId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
}>;


export type OpItemsInSiteBrandForCollectionQuery = { __typename?: 'Query', itemsWithPagination: { __typename?: 'OPTopLineItemsWithPagination', items: Array<{ __typename?: 'OPTopLineItem', id: number, hasAddons: boolean, description?: string | null, businessBaseItemId: number, menuId: number, name?: string | null, position: number, price?: number | null, discount?: { __typename?: 'ItemDiscountSettings', amount?: number | null, amountPer?: number | null, maxDiscount?: number | null, maxDiscountPer?: number | null } | null, images?: { __typename?: 'ItemImages', thumbnailLowRes?: string | null, thumbnail?: string | null, defaultLowRes?: string | null, default?: string | null } | null, stock?: { __typename?: 'OPStockLevel', id: number, amount: number } | null, businessBaseItem: { __typename?: 'OPBusinessBaseItem', brandId?: number | null, allowAsModfier: boolean, allowAsAddon: boolean, businessId: number, excludeFromTop: boolean, sku?: string | null }, tags: Array<{ __typename?: 'OPTagMenu', id: number, position: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null, defaultLowRes?: string | null, thumbnail?: string | null, thumbnailLowRes?: string | null } | null, tag: { __typename?: 'OPTag', type: TagType } }>, tax?: { __typename?: 'TaxSettings', inclusive?: boolean | null, taxRate?: number | null } | null }>, pagination: { __typename?: 'PaginationMeta', size: number, page: number, totalCount: number } } };

export type SingleOpSiteQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
}>;


export type SingleOpSiteQuery = { __typename?: 'Query', opSite: { __typename?: 'OPSite', id: number, name: string, shortName: string, currencyCode: string, currencySymbol: string, images?: { __typename?: 'ItemImages', default?: string | null } | null } };

export type OpSiteQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
  typeCollection?: InputMaybe<TagType>;
  typeCategory?: InputMaybe<TagType>;
}>;


export type OpSiteQuery = { __typename?: 'Query', opSite: { __typename?: 'OPSite', id: number, name: string, shortName: string, currencyCode: string, currencySymbol: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }, opSiteBrands: Array<{ __typename?: 'OPBrand', id: number, name: string, shortName: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }>, opSiteBusiness: Array<{ __typename?: 'OPBusiness', id: number, name: string, shortName: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }>, opSiteTags: Array<{ __typename?: 'OPTag', id: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }>, opSiteMenuTagsCollection: Array<{ __typename?: 'OPTagMenu', id: number, name: string, tag: { __typename?: 'OPTag', id: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }, images?: { __typename?: 'ItemImages', default?: string | null } | null }>, opSiteMenuTagsCategory: Array<{ __typename?: 'OPTagMenu', id: number, name: string, tag: { __typename?: 'OPTag', id: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }, images?: { __typename?: 'ItemImages', default?: string | null } | null }> };


export const OpItemsInActiveMenuDocument = gql`
    query OpItemsInActiveMenu($menuId: Int!, $pagination: Pagination) {
  itemsWithPagination: opItemsInActiveMenu(
    menuId: $menuId
    pagination: $pagination
  ) {
    items {
      id
      hasAddons
      discount {
        amount
        amountPer
        maxDiscount
        maxDiscountPer
      }
      description
      businessBaseItemId
      images {
        thumbnailLowRes
        thumbnail
        defaultLowRes
        default
      }
      menuId
      name
      position
      price
      stock {
        id
        amount
      }
      businessBaseItem {
        brandId
        allowAsModfier
        allowAsAddon
        businessId
        excludeFromTop
        sku
      }
      tags {
        id
        images {
          default
          defaultLowRes
          thumbnail
          thumbnailLowRes
        }
        position
        name
        tag {
          type
        }
      }
      tax {
        inclusive
        taxRate
      }
    }
    pagination {
      size
      page
      totalCount
    }
  }
}
    `;

/**
 * __useOpItemsInActiveMenuQuery__
 *
 * To run a query within a React component, call `useOpItemsInActiveMenuQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpItemsInActiveMenuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpItemsInActiveMenuQuery({
 *   variables: {
 *      menuId: // value for 'menuId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useOpItemsInActiveMenuQuery(baseOptions: Apollo.QueryHookOptions<OpItemsInActiveMenuQuery, OpItemsInActiveMenuQueryVariables> & ({ variables: OpItemsInActiveMenuQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpItemsInActiveMenuQuery, OpItemsInActiveMenuQueryVariables>(OpItemsInActiveMenuDocument, options);
      }
export function useOpItemsInActiveMenuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpItemsInActiveMenuQuery, OpItemsInActiveMenuQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpItemsInActiveMenuQuery, OpItemsInActiveMenuQueryVariables>(OpItemsInActiveMenuDocument, options);
        }
export function useOpItemsInActiveMenuSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpItemsInActiveMenuQuery, OpItemsInActiveMenuQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpItemsInActiveMenuQuery, OpItemsInActiveMenuQueryVariables>(OpItemsInActiveMenuDocument, options);
        }
export type OpItemsInActiveMenuQueryHookResult = ReturnType<typeof useOpItemsInActiveMenuQuery>;
export type OpItemsInActiveMenuLazyQueryHookResult = ReturnType<typeof useOpItemsInActiveMenuLazyQuery>;
export type OpItemsInActiveMenuSuspenseQueryHookResult = ReturnType<typeof useOpItemsInActiveMenuSuspenseQuery>;
export type OpItemsInActiveMenuQueryResult = Apollo.QueryResult<OpItemsInActiveMenuQuery, OpItemsInActiveMenuQueryVariables>;
export const OpItemsInLocationDocument = gql`
    query OpItemsInLocation($locationId: Int!, $pagination: Pagination) {
  itemsWithPagination: opItemsInLocation(
    locationId: $locationId
    pagination: $pagination
  ) {
    items {
      id
      hasAddons
      discount {
        amount
        amountPer
        maxDiscount
        maxDiscountPer
      }
      description
      businessBaseItemId
      images {
        thumbnailLowRes
        thumbnail
        defaultLowRes
        default
      }
      menuId
      name
      position
      price
      stock {
        id
        amount
      }
      businessBaseItem {
        brandId
        allowAsModfier
        allowAsAddon
        businessId
        excludeFromTop
        sku
      }
      tags {
        id
        images {
          default
          defaultLowRes
          thumbnail
          thumbnailLowRes
        }
        position
        name
        tag {
          type
        }
      }
      tax {
        inclusive
        taxRate
      }
    }
    pagination {
      size
      page
      totalCount
    }
  }
}
    `;

/**
 * __useOpItemsInLocationQuery__
 *
 * To run a query within a React component, call `useOpItemsInLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpItemsInLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpItemsInLocationQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useOpItemsInLocationQuery(baseOptions: Apollo.QueryHookOptions<OpItemsInLocationQuery, OpItemsInLocationQueryVariables> & ({ variables: OpItemsInLocationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpItemsInLocationQuery, OpItemsInLocationQueryVariables>(OpItemsInLocationDocument, options);
      }
export function useOpItemsInLocationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpItemsInLocationQuery, OpItemsInLocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpItemsInLocationQuery, OpItemsInLocationQueryVariables>(OpItemsInLocationDocument, options);
        }
export function useOpItemsInLocationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpItemsInLocationQuery, OpItemsInLocationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpItemsInLocationQuery, OpItemsInLocationQueryVariables>(OpItemsInLocationDocument, options);
        }
export type OpItemsInLocationQueryHookResult = ReturnType<typeof useOpItemsInLocationQuery>;
export type OpItemsInLocationLazyQueryHookResult = ReturnType<typeof useOpItemsInLocationLazyQuery>;
export type OpItemsInLocationSuspenseQueryHookResult = ReturnType<typeof useOpItemsInLocationSuspenseQuery>;
export type OpItemsInLocationQueryResult = Apollo.QueryResult<OpItemsInLocationQuery, OpItemsInLocationQueryVariables>;
export const OpItemsInSiteDocument = gql`
    query OpItemsInSite($siteId: Int!, $pagination: Pagination) {
  itemsWithPagination: opItemsInSite(siteId: $siteId, pagination: $pagination) {
    items {
      id
      hasAddons
      discount {
        amount
        amountPer
        maxDiscount
        maxDiscountPer
      }
      description
      businessBaseItemId
      images {
        thumbnailLowRes
        thumbnail
        defaultLowRes
        default
      }
      menuId
      name
      position
      price
      stock {
        id
        amount
      }
      businessBaseItem {
        brandId
        allowAsModfier
        allowAsAddon
        businessId
        excludeFromTop
        sku
      }
      tags {
        id
        images {
          default
          defaultLowRes
          thumbnail
          thumbnailLowRes
        }
        position
        name
        tag {
          type
        }
      }
      tax {
        inclusive
        taxRate
      }
    }
    pagination {
      size
      page
      totalCount
    }
  }
}
    `;

/**
 * __useOpItemsInSiteQuery__
 *
 * To run a query within a React component, call `useOpItemsInSiteQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpItemsInSiteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpItemsInSiteQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useOpItemsInSiteQuery(baseOptions: Apollo.QueryHookOptions<OpItemsInSiteQuery, OpItemsInSiteQueryVariables> & ({ variables: OpItemsInSiteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpItemsInSiteQuery, OpItemsInSiteQueryVariables>(OpItemsInSiteDocument, options);
      }
export function useOpItemsInSiteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpItemsInSiteQuery, OpItemsInSiteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpItemsInSiteQuery, OpItemsInSiteQueryVariables>(OpItemsInSiteDocument, options);
        }
export function useOpItemsInSiteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpItemsInSiteQuery, OpItemsInSiteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpItemsInSiteQuery, OpItemsInSiteQueryVariables>(OpItemsInSiteDocument, options);
        }
export type OpItemsInSiteQueryHookResult = ReturnType<typeof useOpItemsInSiteQuery>;
export type OpItemsInSiteLazyQueryHookResult = ReturnType<typeof useOpItemsInSiteLazyQuery>;
export type OpItemsInSiteSuspenseQueryHookResult = ReturnType<typeof useOpItemsInSiteSuspenseQuery>;
export type OpItemsInSiteQueryResult = Apollo.QueryResult<OpItemsInSiteQuery, OpItemsInSiteQueryVariables>;
export const OpItemsInSiteForBrandDocument = gql`
    query opItemsInSiteForBrand($siteId: Int!, $brandId: Int!, $pagination: Pagination) {
  itemsWithPagination: opItemsInSiteForBrand(
    siteId: $siteId
    brandId: $brandId
    pagination: $pagination
  ) {
    items {
      id
      hasAddons
      discount {
        amount
        amountPer
        maxDiscount
        maxDiscountPer
      }
      description
      businessBaseItemId
      images {
        thumbnailLowRes
        thumbnail
        defaultLowRes
        default
      }
      menuId
      name
      position
      price
      stock {
        id
        amount
      }
      businessBaseItem {
        brandId
        allowAsModfier
        allowAsAddon
        businessId
        excludeFromTop
        sku
      }
      tags {
        id
        images {
          default
          defaultLowRes
          thumbnail
          thumbnailLowRes
        }
        position
        name
        tag {
          type
        }
      }
      tax {
        inclusive
        taxRate
      }
    }
    pagination {
      size
      page
      totalCount
    }
  }
}
    `;

/**
 * __useOpItemsInSiteForBrandQuery__
 *
 * To run a query within a React component, call `useOpItemsInSiteForBrandQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpItemsInSiteForBrandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpItemsInSiteForBrandQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *      brandId: // value for 'brandId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useOpItemsInSiteForBrandQuery(baseOptions: Apollo.QueryHookOptions<OpItemsInSiteForBrandQuery, OpItemsInSiteForBrandQueryVariables> & ({ variables: OpItemsInSiteForBrandQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpItemsInSiteForBrandQuery, OpItemsInSiteForBrandQueryVariables>(OpItemsInSiteForBrandDocument, options);
      }
export function useOpItemsInSiteForBrandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpItemsInSiteForBrandQuery, OpItemsInSiteForBrandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpItemsInSiteForBrandQuery, OpItemsInSiteForBrandQueryVariables>(OpItemsInSiteForBrandDocument, options);
        }
export function useOpItemsInSiteForBrandSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpItemsInSiteForBrandQuery, OpItemsInSiteForBrandQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpItemsInSiteForBrandQuery, OpItemsInSiteForBrandQueryVariables>(OpItemsInSiteForBrandDocument, options);
        }
export type OpItemsInSiteForBrandQueryHookResult = ReturnType<typeof useOpItemsInSiteForBrandQuery>;
export type OpItemsInSiteForBrandLazyQueryHookResult = ReturnType<typeof useOpItemsInSiteForBrandLazyQuery>;
export type OpItemsInSiteForBrandSuspenseQueryHookResult = ReturnType<typeof useOpItemsInSiteForBrandSuspenseQuery>;
export type OpItemsInSiteForBrandQueryResult = Apollo.QueryResult<OpItemsInSiteForBrandQuery, OpItemsInSiteForBrandQueryVariables>;
export const OpItemsInSiteForCollectionDocument = gql`
    query opItemsInSiteForCollection($siteId: Int!, $tagMenuId: Int!, $pagination: Pagination) {
  itemsWithPagination: opItemsInSiteForCollection(
    siteId: $siteId
    tagMenuId: $tagMenuId
    pagination: $pagination
  ) {
    items {
      id
      hasAddons
      discount {
        amount
        amountPer
        maxDiscount
        maxDiscountPer
      }
      description
      businessBaseItemId
      images {
        thumbnailLowRes
        thumbnail
        defaultLowRes
        default
      }
      menuId
      name
      position
      price
      stock {
        id
        amount
      }
      businessBaseItem {
        brandId
        allowAsModfier
        allowAsAddon
        businessId
        excludeFromTop
        sku
      }
      tags {
        id
        images {
          default
          defaultLowRes
          thumbnail
          thumbnailLowRes
        }
        position
        name
        tag {
          type
        }
      }
      tax {
        inclusive
        taxRate
      }
    }
    pagination {
      size
      page
      totalCount
    }
  }
}
    `;

/**
 * __useOpItemsInSiteForCollectionQuery__
 *
 * To run a query within a React component, call `useOpItemsInSiteForCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpItemsInSiteForCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpItemsInSiteForCollectionQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *      tagMenuId: // value for 'tagMenuId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useOpItemsInSiteForCollectionQuery(baseOptions: Apollo.QueryHookOptions<OpItemsInSiteForCollectionQuery, OpItemsInSiteForCollectionQueryVariables> & ({ variables: OpItemsInSiteForCollectionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpItemsInSiteForCollectionQuery, OpItemsInSiteForCollectionQueryVariables>(OpItemsInSiteForCollectionDocument, options);
      }
export function useOpItemsInSiteForCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpItemsInSiteForCollectionQuery, OpItemsInSiteForCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpItemsInSiteForCollectionQuery, OpItemsInSiteForCollectionQueryVariables>(OpItemsInSiteForCollectionDocument, options);
        }
export function useOpItemsInSiteForCollectionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpItemsInSiteForCollectionQuery, OpItemsInSiteForCollectionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpItemsInSiteForCollectionQuery, OpItemsInSiteForCollectionQueryVariables>(OpItemsInSiteForCollectionDocument, options);
        }
export type OpItemsInSiteForCollectionQueryHookResult = ReturnType<typeof useOpItemsInSiteForCollectionQuery>;
export type OpItemsInSiteForCollectionLazyQueryHookResult = ReturnType<typeof useOpItemsInSiteForCollectionLazyQuery>;
export type OpItemsInSiteForCollectionSuspenseQueryHookResult = ReturnType<typeof useOpItemsInSiteForCollectionSuspenseQuery>;
export type OpItemsInSiteForCollectionQueryResult = Apollo.QueryResult<OpItemsInSiteForCollectionQuery, OpItemsInSiteForCollectionQueryVariables>;
export const OpItemsInLocationForCollectionDocument = gql`
    query opItemsInLocationForCollection($locationId: Int!, $tagMenuId: Int!, $pagination: Pagination) {
  itemsWithPagination: opItemsInLocationForCollection(
    locationId: $locationId
    tagMenuId: $tagMenuId
    pagination: $pagination
  ) {
    items {
      id
      hasAddons
      discount {
        amount
        amountPer
        maxDiscount
        maxDiscountPer
      }
      description
      businessBaseItemId
      images {
        thumbnailLowRes
        thumbnail
        defaultLowRes
        default
      }
      menuId
      name
      position
      price
      stock {
        id
        amount
      }
      businessBaseItem {
        brandId
        allowAsModfier
        allowAsAddon
        businessId
        excludeFromTop
        sku
      }
      tags {
        id
        images {
          default
          defaultLowRes
          thumbnail
          thumbnailLowRes
        }
        position
        name
        tag {
          type
        }
      }
      tax {
        inclusive
        taxRate
      }
    }
    pagination {
      size
      page
      totalCount
    }
  }
}
    `;

/**
 * __useOpItemsInLocationForCollectionQuery__
 *
 * To run a query within a React component, call `useOpItemsInLocationForCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpItemsInLocationForCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpItemsInLocationForCollectionQuery({
 *   variables: {
 *      locationId: // value for 'locationId'
 *      tagMenuId: // value for 'tagMenuId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useOpItemsInLocationForCollectionQuery(baseOptions: Apollo.QueryHookOptions<OpItemsInLocationForCollectionQuery, OpItemsInLocationForCollectionQueryVariables> & ({ variables: OpItemsInLocationForCollectionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpItemsInLocationForCollectionQuery, OpItemsInLocationForCollectionQueryVariables>(OpItemsInLocationForCollectionDocument, options);
      }
export function useOpItemsInLocationForCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpItemsInLocationForCollectionQuery, OpItemsInLocationForCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpItemsInLocationForCollectionQuery, OpItemsInLocationForCollectionQueryVariables>(OpItemsInLocationForCollectionDocument, options);
        }
export function useOpItemsInLocationForCollectionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpItemsInLocationForCollectionQuery, OpItemsInLocationForCollectionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpItemsInLocationForCollectionQuery, OpItemsInLocationForCollectionQueryVariables>(OpItemsInLocationForCollectionDocument, options);
        }
export type OpItemsInLocationForCollectionQueryHookResult = ReturnType<typeof useOpItemsInLocationForCollectionQuery>;
export type OpItemsInLocationForCollectionLazyQueryHookResult = ReturnType<typeof useOpItemsInLocationForCollectionLazyQuery>;
export type OpItemsInLocationForCollectionSuspenseQueryHookResult = ReturnType<typeof useOpItemsInLocationForCollectionSuspenseQuery>;
export type OpItemsInLocationForCollectionQueryResult = Apollo.QueryResult<OpItemsInLocationForCollectionQuery, OpItemsInLocationForCollectionQueryVariables>;
export const OpItemsInMenuForCollectionDocument = gql`
    query opItemsInMenuForCollection($menuId: Int!, $tagMenuId: Int!, $pagination: Pagination) {
  itemsWithPagination: opItemsInMenuForCollection(
    menuId: $menuId
    tagMenuId: $tagMenuId
    pagination: $pagination
  ) {
    items {
      id
      hasAddons
      discount {
        amount
        amountPer
        maxDiscount
        maxDiscountPer
      }
      description
      businessBaseItemId
      images {
        thumbnailLowRes
        thumbnail
        defaultLowRes
        default
      }
      menuId
      name
      position
      price
      stock {
        id
        amount
      }
      businessBaseItem {
        brandId
        allowAsModfier
        allowAsAddon
        businessId
        excludeFromTop
        sku
      }
      tags {
        id
        images {
          default
          defaultLowRes
          thumbnail
          thumbnailLowRes
        }
        position
        name
        tag {
          type
        }
      }
      tax {
        inclusive
        taxRate
      }
    }
    pagination {
      size
      page
      totalCount
    }
  }
}
    `;

/**
 * __useOpItemsInMenuForCollectionQuery__
 *
 * To run a query within a React component, call `useOpItemsInMenuForCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpItemsInMenuForCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpItemsInMenuForCollectionQuery({
 *   variables: {
 *      menuId: // value for 'menuId'
 *      tagMenuId: // value for 'tagMenuId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useOpItemsInMenuForCollectionQuery(baseOptions: Apollo.QueryHookOptions<OpItemsInMenuForCollectionQuery, OpItemsInMenuForCollectionQueryVariables> & ({ variables: OpItemsInMenuForCollectionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpItemsInMenuForCollectionQuery, OpItemsInMenuForCollectionQueryVariables>(OpItemsInMenuForCollectionDocument, options);
      }
export function useOpItemsInMenuForCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpItemsInMenuForCollectionQuery, OpItemsInMenuForCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpItemsInMenuForCollectionQuery, OpItemsInMenuForCollectionQueryVariables>(OpItemsInMenuForCollectionDocument, options);
        }
export function useOpItemsInMenuForCollectionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpItemsInMenuForCollectionQuery, OpItemsInMenuForCollectionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpItemsInMenuForCollectionQuery, OpItemsInMenuForCollectionQueryVariables>(OpItemsInMenuForCollectionDocument, options);
        }
export type OpItemsInMenuForCollectionQueryHookResult = ReturnType<typeof useOpItemsInMenuForCollectionQuery>;
export type OpItemsInMenuForCollectionLazyQueryHookResult = ReturnType<typeof useOpItemsInMenuForCollectionLazyQuery>;
export type OpItemsInMenuForCollectionSuspenseQueryHookResult = ReturnType<typeof useOpItemsInMenuForCollectionSuspenseQuery>;
export type OpItemsInMenuForCollectionQueryResult = Apollo.QueryResult<OpItemsInMenuForCollectionQuery, OpItemsInMenuForCollectionQueryVariables>;
export const OpItemsInSiteBrandForCollectionDocument = gql`
    query opItemsInSiteBrandForCollection($siteId: Int!, $brandId: Int!, $tagMenuId: Int!, $pagination: Pagination) {
  itemsWithPagination: opItemsInSiteBrandForCollection(
    siteId: $siteId
    brandId: $brandId
    tagMenuId: $tagMenuId
    pagination: $pagination
  ) {
    items {
      id
      hasAddons
      discount {
        amount
        amountPer
        maxDiscount
        maxDiscountPer
      }
      description
      businessBaseItemId
      images {
        thumbnailLowRes
        thumbnail
        defaultLowRes
        default
      }
      menuId
      name
      position
      price
      stock {
        id
        amount
      }
      businessBaseItem {
        brandId
        allowAsModfier
        allowAsAddon
        businessId
        excludeFromTop
        sku
      }
      tags {
        id
        images {
          default
          defaultLowRes
          thumbnail
          thumbnailLowRes
        }
        position
        name
        tag {
          type
        }
      }
      tax {
        inclusive
        taxRate
      }
    }
    pagination {
      size
      page
      totalCount
    }
  }
}
    `;

/**
 * __useOpItemsInSiteBrandForCollectionQuery__
 *
 * To run a query within a React component, call `useOpItemsInSiteBrandForCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpItemsInSiteBrandForCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpItemsInSiteBrandForCollectionQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *      brandId: // value for 'brandId'
 *      tagMenuId: // value for 'tagMenuId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useOpItemsInSiteBrandForCollectionQuery(baseOptions: Apollo.QueryHookOptions<OpItemsInSiteBrandForCollectionQuery, OpItemsInSiteBrandForCollectionQueryVariables> & ({ variables: OpItemsInSiteBrandForCollectionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpItemsInSiteBrandForCollectionQuery, OpItemsInSiteBrandForCollectionQueryVariables>(OpItemsInSiteBrandForCollectionDocument, options);
      }
export function useOpItemsInSiteBrandForCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpItemsInSiteBrandForCollectionQuery, OpItemsInSiteBrandForCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpItemsInSiteBrandForCollectionQuery, OpItemsInSiteBrandForCollectionQueryVariables>(OpItemsInSiteBrandForCollectionDocument, options);
        }
export function useOpItemsInSiteBrandForCollectionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpItemsInSiteBrandForCollectionQuery, OpItemsInSiteBrandForCollectionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpItemsInSiteBrandForCollectionQuery, OpItemsInSiteBrandForCollectionQueryVariables>(OpItemsInSiteBrandForCollectionDocument, options);
        }
export type OpItemsInSiteBrandForCollectionQueryHookResult = ReturnType<typeof useOpItemsInSiteBrandForCollectionQuery>;
export type OpItemsInSiteBrandForCollectionLazyQueryHookResult = ReturnType<typeof useOpItemsInSiteBrandForCollectionLazyQuery>;
export type OpItemsInSiteBrandForCollectionSuspenseQueryHookResult = ReturnType<typeof useOpItemsInSiteBrandForCollectionSuspenseQuery>;
export type OpItemsInSiteBrandForCollectionQueryResult = Apollo.QueryResult<OpItemsInSiteBrandForCollectionQuery, OpItemsInSiteBrandForCollectionQueryVariables>;
export const SingleOpSiteDocument = gql`
    query SingleOpSite($siteId: Int!) {
  opSite(siteId: $siteId) {
    id
    name
    shortName
    images {
      default
    }
    currencyCode
    currencySymbol
  }
}
    `;

/**
 * __useSingleOpSiteQuery__
 *
 * To run a query within a React component, call `useSingleOpSiteQuery` and pass it any options that fit your needs.
 * When your component renders, `useSingleOpSiteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSingleOpSiteQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *   },
 * });
 */
export function useSingleOpSiteQuery(baseOptions: Apollo.QueryHookOptions<SingleOpSiteQuery, SingleOpSiteQueryVariables> & ({ variables: SingleOpSiteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SingleOpSiteQuery, SingleOpSiteQueryVariables>(SingleOpSiteDocument, options);
      }
export function useSingleOpSiteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SingleOpSiteQuery, SingleOpSiteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SingleOpSiteQuery, SingleOpSiteQueryVariables>(SingleOpSiteDocument, options);
        }
export function useSingleOpSiteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SingleOpSiteQuery, SingleOpSiteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SingleOpSiteQuery, SingleOpSiteQueryVariables>(SingleOpSiteDocument, options);
        }
export type SingleOpSiteQueryHookResult = ReturnType<typeof useSingleOpSiteQuery>;
export type SingleOpSiteLazyQueryHookResult = ReturnType<typeof useSingleOpSiteLazyQuery>;
export type SingleOpSiteSuspenseQueryHookResult = ReturnType<typeof useSingleOpSiteSuspenseQuery>;
export type SingleOpSiteQueryResult = Apollo.QueryResult<SingleOpSiteQuery, SingleOpSiteQueryVariables>;
export const OpSiteDocument = gql`
    query OpSite($siteId: Int!, $typeCollection: TagType, $typeCategory: TagType) {
  opSite(siteId: $siteId) {
    id
    name
    shortName
    images {
      default
    }
    currencyCode
    currencySymbol
  }
  opSiteBrands(siteId: $siteId) {
    id
    name
    shortName
    images {
      default
    }
  }
  opSiteBusiness(siteId: $siteId) {
    id
    name
    shortName
    images {
      default
    }
  }
  opSiteTags(siteId: $siteId) {
    id
    name
    images {
      default
    }
  }
  opSiteMenuTagsCollection: opSiteMenuTags(siteId: $siteId, type: $typeCollection) {
    id
    name
    tag {
      id
      name
      images {
        default
      }
    }
    images {
      default
    }
  }
  opSiteMenuTagsCategory: opSiteMenuTags(siteId: $siteId, type: $typeCategory) {
    id
    name
    tag {
      id
      name
      images {
        default
      }
    }
    images {
      default
    }
  }
}
    `;

/**
 * __useOpSiteQuery__
 *
 * To run a query within a React component, call `useOpSiteQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpSiteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpSiteQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *      typeCollection: // value for 'typeCollection'
 *      typeCategory: // value for 'typeCategory'
 *   },
 * });
 */
export function useOpSiteQuery(baseOptions: Apollo.QueryHookOptions<OpSiteQuery, OpSiteQueryVariables> & ({ variables: OpSiteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpSiteQuery, OpSiteQueryVariables>(OpSiteDocument, options);
      }
export function useOpSiteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpSiteQuery, OpSiteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpSiteQuery, OpSiteQueryVariables>(OpSiteDocument, options);
        }
export function useOpSiteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpSiteQuery, OpSiteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpSiteQuery, OpSiteQueryVariables>(OpSiteDocument, options);
        }
export type OpSiteQueryHookResult = ReturnType<typeof useOpSiteQuery>;
export type OpSiteLazyQueryHookResult = ReturnType<typeof useOpSiteLazyQuery>;
export type OpSiteSuspenseQueryHookResult = ReturnType<typeof useOpSiteSuspenseQuery>;
export type OpSiteQueryResult = Apollo.QueryResult<OpSiteQuery, OpSiteQueryVariables>;