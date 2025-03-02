import { gql } from '@apollo/client';

export const opItemsInSiteForCollection = gql`
  query OpItemsInSiteForCollection($siteId: Int!, $tagId: Int!, $pagination: Pagination!) {
    opItemsInSiteForCollection(siteId: $siteId, tagId: $tagId, pagination: $pagination) {
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
