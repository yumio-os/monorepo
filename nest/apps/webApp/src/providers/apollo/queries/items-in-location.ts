import { gql } from '@apollo/client';

export const OpItemsInLocation = gql`
  query OpItemsInLocation($locationId: Int!, $pagination: Pagination!) {
    opItemsInLocation(locationId: $locationId, pagination: $pagination) {
      pagination {
        page
        size
        totalCount
      }
      items {
        businessBaseItemId
        description
        discount {
          amount
          amountPer
          maxDiscount
          maxDiscountPer
        }
        price
        position
        stock {
          id
          amount
        }
        name
        menuId
        images {
          thumbnailLowRes
          thumbnail
          defaultLowRes
          default
        }
        id
        hasAddons
        businessBaseItem {
          allowAsModfier
          allowAsAddon
          excludeFromTop
          id
          sku
          brandId
        }
      }
    }
  }
`;
