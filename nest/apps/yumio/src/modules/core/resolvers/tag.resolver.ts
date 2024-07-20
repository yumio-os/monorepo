import { Query, Resolver } from '@nestjs/graphql';
import { Tag } from '@yumio/modules/core';

@Resolver()
export class TagResolver {
  @Query((_) => Tag, { nullable: true })
  async coreTag() {
    return null;
  }
}
