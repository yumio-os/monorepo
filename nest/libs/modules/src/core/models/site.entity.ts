import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

import { ItemImages } from './businessBaseItem.entity';
import { Location } from './location.entity';

@ObjectType()
@Entity()
export class Site extends BaseEntity {
  @Field((_) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Location, (location) => location.site)
  @JoinTable()
  @Field((_) => [Location])
  locations: Location[];

  @Field((_) => String)
  @Column({ length: 40 })
  name: string;

  @Field((_) => String)
  @Column({ length: 15 })
  shortName: string;

  @Field((_) => ItemImages, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  images?: ItemImages;
}
