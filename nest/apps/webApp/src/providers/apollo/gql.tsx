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
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type OpBusiness = {
  __typename?: 'OPBusiness';
  id: Scalars['Int']['output'];
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

export type OpLocation = {
  __typename?: 'OPLocation';
  businessId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  menus: Array<OpMenu>;
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  tax?: Maybe<TaxSettings>;
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
  tags: Array<TagMenu>;
  tax?: Maybe<TaxSettings>;
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
  opItemsInLocation: Array<OpMenu>;
  opItemsInMenu: Array<OpTopLineItem>;
  opItemsInSite: Array<OpLocation>;
  opSite: OpSite;
  opSiteBrands: Array<OpBrand>;
  opSiteBusiness: Array<OpBusiness>;
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


export type QueryOpItemsInLocationArgs = {
  locationId: Scalars['Int']['input'];
};


export type QueryOpItemsInMenuArgs = {
  menuId: Scalars['Int']['input'];
};


export type QueryOpItemsInSiteArgs = {
  siteId: Scalars['Int']['input'];
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
  name: Scalars['String']['output'];
  tagMenu: Array<TagMenu>;
  type: TagType;
};

export type TagMenu = {
  __typename?: 'TagMenu';
  id: Scalars['Int']['output'];
  menuItems: Array<MenuBaseItem>;
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

export type OpSiteQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
}>;


export type OpSiteQuery = { __typename?: 'Query', opSite: { __typename?: 'OPSite', name: string, shortName: string, images?: { __typename?: 'ItemImages', thumbnail?: string | null, thumbnailLowRes?: string | null } | null } };

export type OpSiteShortQueryVariables = Exact<{
  siteId: Scalars['Int']['input'];
}>;


export type OpSiteShortQuery = { __typename?: 'Query', opSite: { __typename?: 'OPSite', id: number, name: string, shortName: string, images?: { __typename?: 'ItemImages', thumbnail?: string | null, thumbnailLowRes?: string | null } | null } };


export const OpSiteDocument = gql`
    query OpSite($siteId: Int!) {
  opSite(siteId: $siteId) {
    name
    shortName
    images {
      thumbnail
      thumbnailLowRes
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
export const OpSiteShortDocument = gql`
    query OpSiteShort($siteId: Int!) {
  opSite(siteId: $siteId) {
    id
    name
    shortName
    images {
      thumbnail
      thumbnailLowRes
    }
  }
}
    `;

/**
 * __useOpSiteShortQuery__
 *
 * To run a query within a React component, call `useOpSiteShortQuery` and pass it any options that fit your needs.
 * When your component renders, `useOpSiteShortQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOpSiteShortQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *   },
 * });
 */
export function useOpSiteShortQuery(baseOptions: Apollo.QueryHookOptions<OpSiteShortQuery, OpSiteShortQueryVariables> & ({ variables: OpSiteShortQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OpSiteShortQuery, OpSiteShortQueryVariables>(OpSiteShortDocument, options);
      }
export function useOpSiteShortLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OpSiteShortQuery, OpSiteShortQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OpSiteShortQuery, OpSiteShortQueryVariables>(OpSiteShortDocument, options);
        }
export function useOpSiteShortSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OpSiteShortQuery, OpSiteShortQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OpSiteShortQuery, OpSiteShortQueryVariables>(OpSiteShortDocument, options);
        }
export type OpSiteShortQueryHookResult = ReturnType<typeof useOpSiteShortQuery>;
export type OpSiteShortLazyQueryHookResult = ReturnType<typeof useOpSiteShortLazyQuery>;
export type OpSiteShortSuspenseQueryHookResult = ReturnType<typeof useOpSiteShortSuspenseQuery>;
export type OpSiteShortQueryResult = Apollo.QueryResult<OpSiteShortQuery, OpSiteShortQueryVariables>;