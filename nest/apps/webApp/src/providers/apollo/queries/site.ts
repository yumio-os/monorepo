import { gql } from '@apollo/client';

const scopedQuery = gql`
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

const fullQuery = gql`
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
