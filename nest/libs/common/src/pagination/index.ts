import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class Pagination {
  @Field((_) => Int, { defaultValue: 10 })
  size: number;

  @Field((_) => Int, { defaultValue: 1 })
  page: number;
}

@ObjectType()
export class PaginationMeta {
  @Field((_) => Int)
  totalCount: number;

  @Field((_) => Int)
  page: number;

  @Field((_) => Int)
  size: number;
}

export function DefaultPagiValue() {
  const value = new Pagination();
  value.size = 10;
  value.page = 1;

  return value;
}
