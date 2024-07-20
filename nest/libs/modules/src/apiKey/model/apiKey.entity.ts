import GraphQLJSON from 'graphql-type-json';
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

@ObjectType('StripeReaderBase')
export class StripeReaderBase {
  @Field((_) => String)
  id: string;

  @Field((_) => String)
  object: string;

  @Field((_) => String, { nullable: true })
  deviceSwVersion?: string;

  @Field((_) => String)
  deviceType: string;

  @Field((_) => String, { nullable: true })
  label?: string;

  @Field((_) => String, { nullable: true })
  location?: string;

  @Field((_) => String)
  serialNumber: string;
}

@ObjectType()
export class StripeReaderAction {
  @Field((_) => String, { nullable: true })
  failureCode?: string;

  @Field((_) => String, { nullable: true })
  failureMessage?: string;

  @Field((_) => GraphQLJSON, { nullable: true })
  processPaymentIntent?: any;

  @Field((_) => GraphQLJSON, { nullable: true })
  processSetupIntent?: any;

  @Field((_) => GraphQLJSON, { nullable: true })
  refundPayment?: any;

  @Field((_) => GraphQLJSON, { nullable: true })
  set_reader_display?: any;

  // @TODO if ever neede move to enums
  @Field((_) => String, { nullable: true })
  status?: 'in_progress' | 'succeeded' | 'failed';

  // @TODO if ever neede move to enums
  @Field((_) => String, { nullable: true })
  type?: 'process_payment_intent' | 'process_setup_intent' | 'set_reader_display' | 'refund_payment';
}

@ObjectType('StripeReader')
export class StripeReader extends StripeReaderBase {
  @Field((_) => StripeReaderAction, { nullable: true })
  action?: StripeReaderAction;

  @Field((_) => GraphQLJSON, { nullable: true })
  metadata?: any;

  @Field((_) => String, { nullable: true })
  livemode?: boolean;

  @Field((_) => String, { nullable: true })
  status?: string;

  @Field((_) => String, { nullable: true })
  ipAddress?: string;
}

export enum TerminalArrowAngleArrow {
  Down = 'Down',
  Left = 'Left',
  Right = 'Right',
}

export const TerminalArrowAngleArrowEnumType = registerEnumType(TerminalArrowAngleArrow, {
  name: 'TerminalArrowAngleArrow',
  valuesMap: {
    Down: {
      description: 'Down',
    },
    Left: {
      description: 'Left',
    },
    Right: {
      description: 'Right',
    },
  },
});

@Entity()
@Unique(['apiKey'])
@ObjectType('DeviceInfo')
export class ApiKey extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => String)
  @Column({ type: 'uuid' })
  @Index()
  apiKey: string;

  @Column({ type: 'uuid', nullable: true })
  @Index()
  deviceId?: string;

  @Column({ nullable: true })
  @Index()
  @Field((_) => String, { nullable: true })
  stripeTerminalId?: string;

  @Column({ type: 'jsonb', nullable: true })
  @Field((_) => StripeReaderBase, { nullable: true })
  readerInfo: StripeReaderBase;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Field((_) => [Int], { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  serviceAreaIds: number[];

  @Field((_) => String, {
    nullable: true,
  })
  @Column({ nullable: true })
  @Index()
  defaultLanguage?: string;

  @Field((_) => String, {
    nullable: true,
  })
  @Column({ nullable: true })
  systemLogoUrl?: string;

  @Field((_) => String, {
    nullable: true,
  })
  @Column({ nullable: true })
  backgroundImageUrl?: string;

  @Field((_) => String, {
    nullable: true,
  })
  @Column({ nullable: true })
  qrCodeUrl?: string;

  @Column({ type: 'boolean', default: false })
  bindable?: boolean;

  @Column({ nullable: true })
  note?: string;

  @Field((_) => TerminalArrowAngleArrow, { nullable: true })
  @Column({ type: 'simple-enum', enum: TerminalArrowAngleArrow, nullable: true })
  terminalArrowAngle?: TerminalArrowAngleArrow;

  @Column({ nullable: true })
  @Index()
  @Field((_) => String, { nullable: true })
  kioskName?: string;
}
