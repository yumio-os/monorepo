import { gql } from '@apollo/client';

export const OpTag = gql`
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
