import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PhoneAuthInitiateResponse {
  @Field((_) => Boolean)
  success: boolean;
}
