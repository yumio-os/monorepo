import { gql } from '@apollo/client';

const SingleOpSite = gql`
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

const fullSiteQuery = gql`
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
