import { Field, ObjectType } from '@nestjs/graphql';
import { ApiKey, StripeReader } from '@yumio/modules/apiKey/model';

@ObjectType()
export class ConnectionToken {
  @Field((_) => String)
  object: string;

  @Field((_) => String)
  secret: string;

  @Field((_) => String, { nullable: true })
  location?: string;
}

@ObjectType()
export class LockApiKeyResponse {
  @Field((_) => ApiKey, { nullable: true })
  apiKey?: ApiKey;

  @Field((_) => StripeReader, { nullable: true })
  reader?: StripeReader;

  @Field((_) => String, { nullable: true })
  message?: string;
}
