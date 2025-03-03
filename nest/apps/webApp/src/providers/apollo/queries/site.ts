import { gql } from '@apollo/client';

export const fullSiteQuery = gql`
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

export const opOneSite = gql`
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

export const opOneSiteBrand = gql`
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

export const opOneSiteBusiness = gql`
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

export const OpSiteLocation = gql`
  query OpSiteLocation($siteId: Int!) {
    opSiteLocation(siteId: $siteId) {
      id
      businessId
      name
      shortName
      business {
        id
        name
        images {
          default
          defaultLowRes
          thumbnail
          thumbnailLowRes
        }
      }
    }
  }
`;

export const OpLocation = gql`
  query OpLocation($locationId: Int!) {
    opLocation(locationId: $locationId) {
      id
      businessId
      business {
        id
        images {
          default
          defaultLowRes
          thumbnail
          thumbnailLowRes
        }
        name
        shortName
      }
      name
      shortName
      tax {
        inclusive
        taxRate
      }
      menus {
        id
        default
        name
      }
    }
  }
`;

export const opOneSiteTags = gql`
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

export const opOneSiteMenuTagsCollection = gql`
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

export const opOneSiteMenuTagsCategory = gql`
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

export const opItemsInSite = gql`
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
