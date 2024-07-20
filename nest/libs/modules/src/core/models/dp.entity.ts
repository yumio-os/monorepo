import GraphQLJSON from 'graphql-type-json';
import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import { Location } from './location.entity';

export enum DpStatus {
  new = 'new',
  offline = 'offline',
  live = 'live',
  pendingOffline = 'pendingOffline',
  pendingLive = 'pendingLive',
}

export const DpStatusRegistered = registerEnumType(DpStatus, {
  name: 'DpStatus',
  valuesMap: {
    new: {
      description: 'new',
    },
    offline: {
      description: 'offline',
    },
    live: {
      description: 'live',
    },
    pendingOffline: {
      description: 'pendingOffline',
    },
    pendingLive: {
      description: 'pendingLive',
    },
  },
});

export enum IntegrationType {
  pos = 'pos',
  app = 'app',
  web = 'web',
  kiosk = 'kiosk',

  //
  justEat = 'justEat',
}

export const IntegrationTypeRegistered = registerEnumType(IntegrationType, {
  name: 'IntegrationType',
  valuesMap: {
    pos: {},
    app: {},
    web: {},
    kiosk: {},
    justEat: {},
  },
});

@ObjectType()
export class DeliveryPlatformSwitch {
  @Field((_) => Boolean, { defaultValue: false })
  justEat: boolean;
}

@Entity()
@ObjectType()
export class DeliveryPlatform extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => String)
  @Column()
  name: string;

  @Field((_) => IntegrationType, { defaultValue: IntegrationType.pos })
  @Column({ type: 'simple-enum', enum: IntegrationType, default: IntegrationType.pos })
  integration: IntegrationType;

  // type pos // kiosk // app // delivero // uber eats

  @OneToMany((_) => DeliveryPlatformLocation, (dpLocation) => dpLocation.deliveryPlatform, { nullable: true })
  @Field((_) => [DeliveryPlatformLocation], { defaultValue: [] })
  locations: DeliveryPlatformLocation[];
}

@Entity()
@ObjectType()
export class DeliveryPlatformLocation extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((_) => String)
  @Column()
  name: string;

  @Field((_) => DpStatus, { defaultValue: DpStatus.offline })
  @Column({ type: 'simple-enum', enum: DpStatus, default: DpStatus.offline })
  status: DpStatus;

  @Index()
  @Field((_) => Int)
  @Column({ type: 'integer' })
  locationId: number;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'locationId' })
  @Field((_) => Location)
  location: Location; // todo other side & projections

  @Index()
  @Field((_) => Int)
  @Column({ type: 'integer' })
  deliveryPlatformId: number;

  @ManyToOne((_) => DeliveryPlatform)
  @JoinColumn({ name: 'deliveryPlatformId' })
  @Field((_) => DeliveryPlatform)
  deliveryPlatform: DeliveryPlatform;

  @Field((_) => Boolean, { defaultValue: false })
  @Column({ type: 'bool', default: false })
  default: boolean;

  // menu overrides

  @Field((_) => GraphQLJSON, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  externalMenu: any;
}
