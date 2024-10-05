import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { FieldMap } from '@yumio/common/decorators';
import { Tag } from '@yumio/modules/core';

import { ProjectionService } from '../services/projections.service';
import { TagService } from '../services/tag.service';

@ArgsType()
export class ArgsTagById {
  @Field((_) => Int)
  tagId: number;
}

@Resolver()
export class TagResolver {
  constructor(
    private tagService: TagService,
    private projection: ProjectionService,
  ) {}

  @Query((_) => Tag, { nullable: true })
  async coreTag(@FieldMap() fieldMap, @Args() { tagId }: ArgsTagById) {
    return this.tagService.findOneById(tagId, this.projection.tags(fieldMap));
  }
}
