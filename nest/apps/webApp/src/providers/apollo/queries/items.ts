import { gql } from '@apollo/client';

const opItemsInActiveMenu = gql`
  query OpItemsInActiveMenu($menuId: Int!, $pagination: Pagination) {
    itemsWithPagination: opItemsInActiveMenu(menuId: $menuId, pagination: $pagination) {
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

const opItemsInLocation = gql`
  query OpItemsInLocation($locationId: Int!, $pagination: Pagination) {
    itemsWithPagination: opItemsInLocation(locationId: $locationId, pagination: $pagination) {
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

const opItemsInSite = gql`
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

const opItemsInSiteAndBrand = gql`
  query opItemsInSiteForBrand($siteId: Int!, $brandId: Int!, $pagination: Pagination) {
    itemsWithPagination: opItemsInSiteForBrand(siteId: $siteId, brandId: $brandId, pagination: $pagination) {
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

const opItemsInSiteAndCollection = gql`
  query opItemsInSiteForCollection($siteId: Int!, $tagMenuId: Int!, $pagination: Pagination) {
    itemsWithPagination: opItemsInSiteForCollection(siteId: $siteId, tagMenuId: $tagMenuId, pagination: $pagination) {
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

const opItemsInLocationAndCollection = gql`
  query opItemsInLocationForCollection($locationId: Int!, $tagMenuId: Int!, $pagination: Pagination) {
    itemsWithPagination: opItemsInLocationForCollection(locationId: $locationId, tagMenuId: $tagMenuId, pagination: $pagination) {
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

const opItemsInMenuAndCollection = gql`
  query opItemsInMenuForCollection($menuId: Int!, $tagMenuId: Int!, $pagination: Pagination) {
    itemsWithPagination: opItemsInMenuForCollection(menuId: $menuId, tagMenuId: $tagMenuId, pagination: $pagination) {
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

const opItemsInSiteBrandForCollection = gql`
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
