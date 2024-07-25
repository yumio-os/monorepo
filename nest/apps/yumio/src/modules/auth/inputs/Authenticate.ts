import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class ReaderDetails {
  @Field((_) => String)
  registraionCode: string;

  @Field((_) => String, {
    nullable: true,
    description: 'If not provided, registration code gonna be used as label',
  })
  label?: string;

  @Field((_) => String)
  locationId: string;
}

@ArgsType()
export class ArgsLockApiToken {
  @Field((_) => String, { nullable: true })
  deviceId?: string;

  @Field((_) => ReaderDetails, {
    nullable: true,
    description: `register a new reader with stripe, if succesfull the reader id will be bound to apiKey`,
  })
  reader?: ReaderDetails;
}

@ArgsType()
export class ArgsRegisterTerminal {
  @Field((_) => ReaderDetails, {
    description: `register a new reader with stripe, if succesfull the reader id will be bound to apiKey. If previous terminal was bound to key, it will be replaced. This does not destroy the terminal itself, just unbinds it from the device/apikey`,
  })
  reader: ReaderDetails;
}
