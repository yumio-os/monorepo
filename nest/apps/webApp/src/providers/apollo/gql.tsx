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
  opTag: OpTag;
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
  pagination?: Pagination;
};


export type QueryOpItemsInLocationArgs = {
  locationId: Scalars['Int']['input'];
  pagination?: Pagination;
};


export type QueryOpItemsInLocationForCollectionArgs = {
  locationId: Scalars['Int']['input'];
  pagination?: Pagination;
  tagMenuId: Scalars['Int']['input'];
};


export type QueryOpItemsInMenuArgs = {
  menuId: Scalars['Int']['input'];
  pagination?: Pagination;
};


export type QueryOpItemsInMenuForCollectionArgs = {
  menuId: Scalars['Int']['input'];
  pagination?: Pagination;
  tagMenuId: Scalars['Int']['input'];
};


export type QueryOpItemsInSiteArgs = {
  pagination?: InputMaybe<Pagination>;
  siteId: Scalars['Int']['input'];
};


export type QueryOpItemsInSiteBrandForCollectionArgs = {
  brandId: Scalars['Int']['input'];
  pagination?: Pagination;
  siteId: Scalars['Int']['input'];
  tagMenuId: Scalars['Int']['input'];
};


export type QueryOpItemsInSiteForBrandArgs = {
  brandId: Scalars['Int']['input'];
  pagination?: Pagination;
  siteId: Scalars['Int']['input'];
};


export type QueryOpItemsInSiteForCollectionArgs = {
  pagination?: Pagination;
  siteId: Scalars['Int']['input'];
  tagId: Scalars['Int']['input'];
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


export type QueryOpTagArgs = {
  tagId: Scalars['Int']['input'];
};

export type Site = {
  __typename?: 'Site';
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

export type OpItemsInSiteForCollectionQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
  tagId: Scalars['Int']['input'];
  pagination: Pagination;
}>;


export type OpItemsInSiteForCollectionQuery = { __typename?: 'Query', opItemsInSiteForCollection: { __typename?: 'OPTopLineItemsWithPagination', items: Array<{ __typename?: 'OPTopLineItem', id: number, name?: string | null, businessBaseItemId: number, menuId: number, position: number, price?: number | null, description?: string | null, hasAddons: boolean, tags: Array<{ __typename?: 'OPTagMenu', id: number, name: string, tag: { __typename?: 'OPTag', id: number, name: string } }>, businessBaseItem: { __typename?: 'OPBusinessBaseItem', id: number }, images?: { __typename?: 'ItemImages', default?: string | null, defaultLowRes?: string | null, thumbnail?: string | null, thumbnailLowRes?: string | null } | null, stock?: { __typename?: 'OPStockLevel', id: number, amount: number } | null, tax?: { __typename?: 'TaxSettings', taxRate?: number | null } | null, discount?: { __typename?: 'ItemDiscountSettings', amount?: number | null, maxDiscount?: number | null, maxDiscountPer?: number | null, amountPer?: number | null } | null }>, pagination: { __typename?: 'PaginationMeta', page: number, size: number, totalCount: number } } };

export type OpSiteQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
  typeCollection?: InputMaybe<TagType>;
  typeCategory?: InputMaybe<TagType>;
}>;


export type OpSiteQuery = { __typename?: 'Query', opSite: { __typename?: 'OPSite', id: number, name: string, shortName: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }, opSiteBrands: Array<{ __typename?: 'OPBrand', id: number, name: string, shortName: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }>, opSiteBusiness: Array<{ __typename?: 'OPBusiness', id: number, name: string, shortName: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }>, opSiteTags: Array<{ __typename?: 'OPTag', id: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }>, opSiteMenuTagsCollection: Array<{ __typename?: 'OPTagMenu', id: number, name: string, tag: { __typename?: 'OPTag', id: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }, images?: { __typename?: 'ItemImages', default?: string | null } | null }>, opSiteMenuTagsCategory: Array<{ __typename?: 'OPTagMenu', id: number, name: string, tag: { __typename?: 'OPTag', id: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }, images?: { __typename?: 'ItemImages', default?: string | null } | null }> };

export type OpOneSiteQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
}>;


export type OpOneSiteQuery = { __typename?: 'Query', opSite: { __typename?: 'OPSite', id: number, name: string, shortName: string, images?: { __typename?: 'ItemImages', default?: string | null } | null } };

export type OpOneSiteBrandQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
}>;


export type OpOneSiteBrandQuery = { __typename?: 'Query', opSiteBrands: Array<{ __typename?: 'OPBrand', id: number, name: string, shortName: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }> };

export type OpOneSiteBusinessQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
}>;


export type OpOneSiteBusinessQuery = { __typename?: 'Query', opSiteBusiness: Array<{ __typename?: 'OPBusiness', id: number, name: string, shortName: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }> };

export type OpOneSiteTagsQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
}>;


export type OpOneSiteTagsQuery = { __typename?: 'Query', opSiteTags: Array<{ __typename?: 'OPTag', id: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }> };

export type OpOneSiteMenuTagsCollectionQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
  type?: InputMaybe<TagType>;
}>;


export type OpOneSiteMenuTagsCollectionQuery = { __typename?: 'Query', opSiteMenuTagsCollection: Array<{ __typename?: 'OPTagMenu', id: number, name: string, tag: { __typename?: 'OPTag', id: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }, images?: { __typename?: 'ItemImages', default?: string | null } | null }> };

export type OpOneSiteMenuTagsCategoryQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
  type?: InputMaybe<TagType>;
}>;


export type OpOneSiteMenuTagsCategoryQuery = { __typename?: 'Query', opSiteMenuTagsCategory: Array<{ __typename?: 'OPTagMenu', id: number, name: string, tag: { __typename?: 'OPTag', id: number, name: string, images?: { __typename?: 'ItemImages', default?: string | null } | null }, images?: { __typename?: 'ItemImages', default?: string | null } | null }> };

export type OpItemsInSiteQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
  pagination?: InputMaybe<Pagination>;
}>;


export type OpItemsInSiteQuery = { __typename?: 'Query', opItemsInSite: { __typename?: 'OPTopLineItemsWithPagination', pagination: { __typename?: 'PaginationMeta', page: number, size: number, totalCount: number }, items: Array<{ __typename?: 'OPTopLineItem', id: number, businessBaseItemId: number, menuId: number, hasAddons: boolean, name?: string | null, price?: number | null, position: number, images?: { __typename?: 'ItemImages', default?: string | null, defaultLowRes?: string | null, thumbnail?: string | null, thumbnailLowRes?: string | null } | null, discount?: { __typename?: 'ItemDiscountSettings', amount?: number | null, amountPer?: number | null, maxDiscount?: number | null, maxDiscountPer?: number | null } | null, stock?: { __typename?: 'OPStockLevel', amount: number } | null, businessBaseItem: { __typename?: 'OPBusinessBaseItem', id: number, sku?: string | null, brandId?: number | null, businessId: number } }> } };

export type OpTagQueryVariables = Exact<{
  tagId: Scalars['Int']['input'];
}>;


export type OpTagQuery = { __typename?: 'Query', opTag: { __typename?: 'OPTag', id: number, name: string, type: TagType, images?: { __typename?: 'ItemImages', thumbnail?: string | null, thumbnailLowRes?: string | null, defaultLowRes?: string | null, default?: string | null } | null } };


export const OpItemsInSiteForCollectionDocument = gql`
    query OpItemsInSiteForCollection($siteId: Int!, $tagId: Int!, $pagination: Pagination!) {
  opItemsInSiteForCollection(
    siteId: $siteId
    tagId: $tagId
    pagination: $pagination
  ) {
    items {
      id
      name
      tags {
        id
        name
        tag {
          id
          name
        }
      }
      businessBaseItemId
      businessBaseItem {
        id
      }
      images {
        default
        defaultLowRes
        thumbnail
        thumbnailLowRes
      }
      menuId
      position
      price
      stock {
        id
        amount
      }
      tax {
        taxRate
      }
      discount {
        amount
        maxDiscount
        maxDiscountPer
        amountPer
      }
      description
      hasAddons
    }
    pagination {
      page
      size
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
 *      tagId: // value for 'tagId'
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
export const OpSiteDocument = gql`
    query OpSite($siteId: Int!, $typeCollection: TagType, $typeCategory: TagType) {
  opSite(siteId: $siteId) {
    id
    name
    shortName
    images {
      default
    }
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
export const OpOneSiteDocument = gql`
    query OpOneSite($siteId: Int!) {
  opSite(siteId: $siteId) {
    id
    name
    shortName
    images {
      default
    }
  }
}
    `;

/**
 * __useOpOneSiteQuery__
 *
 * To run a query within a React component, call `useOpOneSiteQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpOneSiteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpOneSiteQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *   },
 * });
 */
export function useOpOneSiteQuery(baseOptions: Apollo.QueryHookOptions<OpOneSiteQuery, OpOneSiteQueryVariables> & ({ variables: OpOneSiteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpOneSiteQuery, OpOneSiteQueryVariables>(OpOneSiteDocument, options);
      }
export function useOpOneSiteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpOneSiteQuery, OpOneSiteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpOneSiteQuery, OpOneSiteQueryVariables>(OpOneSiteDocument, options);
        }
export function useOpOneSiteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpOneSiteQuery, OpOneSiteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpOneSiteQuery, OpOneSiteQueryVariables>(OpOneSiteDocument, options);
        }
export type OpOneSiteQueryHookResult = ReturnType<typeof useOpOneSiteQuery>;
export type OpOneSiteLazyQueryHookResult = ReturnType<typeof useOpOneSiteLazyQuery>;
export type OpOneSiteSuspenseQueryHookResult = ReturnType<typeof useOpOneSiteSuspenseQuery>;
export type OpOneSiteQueryResult = Apollo.QueryResult<OpOneSiteQuery, OpOneSiteQueryVariables>;
export const OpOneSiteBrandDocument = gql`
    query OpOneSiteBrand($siteId: Int!) {
  opSiteBrands(siteId: $siteId) {
    id
    name
    shortName
    images {
      default
    }
  }
}
    `;

/**
 * __useOpOneSiteBrandQuery__
 *
 * To run a query within a React component, call `useOpOneSiteBrandQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpOneSiteBrandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpOneSiteBrandQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *   },
 * });
 */
export function useOpOneSiteBrandQuery(baseOptions: Apollo.QueryHookOptions<OpOneSiteBrandQuery, OpOneSiteBrandQueryVariables> & ({ variables: OpOneSiteBrandQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpOneSiteBrandQuery, OpOneSiteBrandQueryVariables>(OpOneSiteBrandDocument, options);
      }
export function useOpOneSiteBrandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpOneSiteBrandQuery, OpOneSiteBrandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpOneSiteBrandQuery, OpOneSiteBrandQueryVariables>(OpOneSiteBrandDocument, options);
        }
export function useOpOneSiteBrandSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpOneSiteBrandQuery, OpOneSiteBrandQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpOneSiteBrandQuery, OpOneSiteBrandQueryVariables>(OpOneSiteBrandDocument, options);
        }
export type OpOneSiteBrandQueryHookResult = ReturnType<typeof useOpOneSiteBrandQuery>;
export type OpOneSiteBrandLazyQueryHookResult = ReturnType<typeof useOpOneSiteBrandLazyQuery>;
export type OpOneSiteBrandSuspenseQueryHookResult = ReturnType<typeof useOpOneSiteBrandSuspenseQuery>;
export type OpOneSiteBrandQueryResult = Apollo.QueryResult<OpOneSiteBrandQuery, OpOneSiteBrandQueryVariables>;
export const OpOneSiteBusinessDocument = gql`
    query OpOneSiteBusiness($siteId: Int!) {
  opSiteBusiness(siteId: $siteId) {
    id
    name
    shortName
    images {
      default
    }
  }
}
    `;

/**
 * __useOpOneSiteBusinessQuery__
 *
 * To run a query within a React component, call `useOpOneSiteBusinessQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpOneSiteBusinessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpOneSiteBusinessQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *   },
 * });
 */
export function useOpOneSiteBusinessQuery(baseOptions: Apollo.QueryHookOptions<OpOneSiteBusinessQuery, OpOneSiteBusinessQueryVariables> & ({ variables: OpOneSiteBusinessQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpOneSiteBusinessQuery, OpOneSiteBusinessQueryVariables>(OpOneSiteBusinessDocument, options);
      }
export function useOpOneSiteBusinessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpOneSiteBusinessQuery, OpOneSiteBusinessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpOneSiteBusinessQuery, OpOneSiteBusinessQueryVariables>(OpOneSiteBusinessDocument, options);
        }
export function useOpOneSiteBusinessSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpOneSiteBusinessQuery, OpOneSiteBusinessQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpOneSiteBusinessQuery, OpOneSiteBusinessQueryVariables>(OpOneSiteBusinessDocument, options);
        }
export type OpOneSiteBusinessQueryHookResult = ReturnType<typeof useOpOneSiteBusinessQuery>;
export type OpOneSiteBusinessLazyQueryHookResult = ReturnType<typeof useOpOneSiteBusinessLazyQuery>;
export type OpOneSiteBusinessSuspenseQueryHookResult = ReturnType<typeof useOpOneSiteBusinessSuspenseQuery>;
export type OpOneSiteBusinessQueryResult = Apollo.QueryResult<OpOneSiteBusinessQuery, OpOneSiteBusinessQueryVariables>;
export const OpOneSiteTagsDocument = gql`
    query OpOneSiteTags($siteId: Int!) {
  opSiteTags(siteId: $siteId) {
    id
    name
    images {
      default
    }
  }
}
    `;

/**
 * __useOpOneSiteTagsQuery__
 *
 * To run a query within a React component, call `useOpOneSiteTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpOneSiteTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpOneSiteTagsQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *   },
 * });
 */
export function useOpOneSiteTagsQuery(baseOptions: Apollo.QueryHookOptions<OpOneSiteTagsQuery, OpOneSiteTagsQueryVariables> & ({ variables: OpOneSiteTagsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpOneSiteTagsQuery, OpOneSiteTagsQueryVariables>(OpOneSiteTagsDocument, options);
      }
export function useOpOneSiteTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpOneSiteTagsQuery, OpOneSiteTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpOneSiteTagsQuery, OpOneSiteTagsQueryVariables>(OpOneSiteTagsDocument, options);
        }
export function useOpOneSiteTagsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpOneSiteTagsQuery, OpOneSiteTagsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpOneSiteTagsQuery, OpOneSiteTagsQueryVariables>(OpOneSiteTagsDocument, options);
        }
export type OpOneSiteTagsQueryHookResult = ReturnType<typeof useOpOneSiteTagsQuery>;
export type OpOneSiteTagsLazyQueryHookResult = ReturnType<typeof useOpOneSiteTagsLazyQuery>;
export type OpOneSiteTagsSuspenseQueryHookResult = ReturnType<typeof useOpOneSiteTagsSuspenseQuery>;
export type OpOneSiteTagsQueryResult = Apollo.QueryResult<OpOneSiteTagsQuery, OpOneSiteTagsQueryVariables>;
export const OpOneSiteMenuTagsCollectionDocument = gql`
    query OpOneSiteMenuTagsCollection($siteId: Int!, $type: TagType) {
  opSiteMenuTagsCollection: opSiteMenuTags(siteId: $siteId, type: $type) {
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
 * __useOpOneSiteMenuTagsCollectionQuery__
 *
 * To run a query within a React component, call `useOpOneSiteMenuTagsCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpOneSiteMenuTagsCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpOneSiteMenuTagsCollectionQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useOpOneSiteMenuTagsCollectionQuery(baseOptions: Apollo.QueryHookOptions<OpOneSiteMenuTagsCollectionQuery, OpOneSiteMenuTagsCollectionQueryVariables> & ({ variables: OpOneSiteMenuTagsCollectionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpOneSiteMenuTagsCollectionQuery, OpOneSiteMenuTagsCollectionQueryVariables>(OpOneSiteMenuTagsCollectionDocument, options);
      }
export function useOpOneSiteMenuTagsCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpOneSiteMenuTagsCollectionQuery, OpOneSiteMenuTagsCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpOneSiteMenuTagsCollectionQuery, OpOneSiteMenuTagsCollectionQueryVariables>(OpOneSiteMenuTagsCollectionDocument, options);
        }
export function useOpOneSiteMenuTagsCollectionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpOneSiteMenuTagsCollectionQuery, OpOneSiteMenuTagsCollectionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpOneSiteMenuTagsCollectionQuery, OpOneSiteMenuTagsCollectionQueryVariables>(OpOneSiteMenuTagsCollectionDocument, options);
        }
export type OpOneSiteMenuTagsCollectionQueryHookResult = ReturnType<typeof useOpOneSiteMenuTagsCollectionQuery>;
export type OpOneSiteMenuTagsCollectionLazyQueryHookResult = ReturnType<typeof useOpOneSiteMenuTagsCollectionLazyQuery>;
export type OpOneSiteMenuTagsCollectionSuspenseQueryHookResult = ReturnType<typeof useOpOneSiteMenuTagsCollectionSuspenseQuery>;
export type OpOneSiteMenuTagsCollectionQueryResult = Apollo.QueryResult<OpOneSiteMenuTagsCollectionQuery, OpOneSiteMenuTagsCollectionQueryVariables>;
export const OpOneSiteMenuTagsCategoryDocument = gql`
    query OpOneSiteMenuTagsCategory($siteId: Int!, $type: TagType) {
  opSiteMenuTagsCategory: opSiteMenuTags(siteId: $siteId, type: $type) {
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
 * __useOpOneSiteMenuTagsCategoryQuery__
 *
 * To run a query within a React component, call `useOpOneSiteMenuTagsCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpOneSiteMenuTagsCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpOneSiteMenuTagsCategoryQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useOpOneSiteMenuTagsCategoryQuery(baseOptions: Apollo.QueryHookOptions<OpOneSiteMenuTagsCategoryQuery, OpOneSiteMenuTagsCategoryQueryVariables> & ({ variables: OpOneSiteMenuTagsCategoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpOneSiteMenuTagsCategoryQuery, OpOneSiteMenuTagsCategoryQueryVariables>(OpOneSiteMenuTagsCategoryDocument, options);
      }
export function useOpOneSiteMenuTagsCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpOneSiteMenuTagsCategoryQuery, OpOneSiteMenuTagsCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpOneSiteMenuTagsCategoryQuery, OpOneSiteMenuTagsCategoryQueryVariables>(OpOneSiteMenuTagsCategoryDocument, options);
        }
export function useOpOneSiteMenuTagsCategorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpOneSiteMenuTagsCategoryQuery, OpOneSiteMenuTagsCategoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpOneSiteMenuTagsCategoryQuery, OpOneSiteMenuTagsCategoryQueryVariables>(OpOneSiteMenuTagsCategoryDocument, options);
        }
export type OpOneSiteMenuTagsCategoryQueryHookResult = ReturnType<typeof useOpOneSiteMenuTagsCategoryQuery>;
export type OpOneSiteMenuTagsCategoryLazyQueryHookResult = ReturnType<typeof useOpOneSiteMenuTagsCategoryLazyQuery>;
export type OpOneSiteMenuTagsCategorySuspenseQueryHookResult = ReturnType<typeof useOpOneSiteMenuTagsCategorySuspenseQuery>;
export type OpOneSiteMenuTagsCategoryQueryResult = Apollo.QueryResult<OpOneSiteMenuTagsCategoryQuery, OpOneSiteMenuTagsCategoryQueryVariables>;
export const OpItemsInSiteDocument = gql`
    query OpItemsInSite($siteId: Int!, $pagination: Pagination) {
  opItemsInSite(siteId: $siteId, pagination: $pagination) {
    pagination {
      page
      size
      totalCount
    }
    items {
      id
      businessBaseItemId
      menuId
      hasAddons
      name
      images {
        default
        defaultLowRes
        thumbnail
        thumbnailLowRes
      }
      price
      discount {
        amount
        amountPer
        maxDiscount
        maxDiscountPer
      }
      position
      stock {
        amount
      }
      businessBaseItem {
        id
        sku
        brandId
        businessId
      }
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
export const OpTagDocument = gql`
    query OpTag($tagId: Int!) {
  opTag(tagId: $tagId) {
    id
    images {
      thumbnail
      thumbnailLowRes
      defaultLowRes
      default
    }
    name
    type
  }
}
    `;

/**
 * __useOpTagQuery__
 *
 * To run a query within a React component, call `useOpTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpTagQuery({
 *   variables: {
 *      tagId: // value for 'tagId'
 *   },
 * });
 */
export function useOpTagQuery(baseOptions: Apollo.QueryHookOptions<OpTagQuery, OpTagQueryVariables> & ({ variables: OpTagQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpTagQuery, OpTagQueryVariables>(OpTagDocument, options);
      }
export function useOpTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpTagQuery, OpTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpTagQuery, OpTagQueryVariables>(OpTagDocument, options);
        }
export function useOpTagSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpTagQuery, OpTagQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpTagQuery, OpTagQueryVariables>(OpTagDocument, options);
        }
export type OpTagQueryHookResult = ReturnType<typeof useOpTagQuery>;
export type OpTagLazyQueryHookResult = ReturnType<typeof useOpTagLazyQuery>;
export type OpTagSuspenseQueryHookResult = ReturnType<typeof useOpTagSuspenseQuery>;
export type OpTagQueryResult = Apollo.QueryResult<OpTagQuery, OpTagQueryVariables>;