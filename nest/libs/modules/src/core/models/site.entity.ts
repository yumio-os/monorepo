import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';

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
  @Column({ length: 20 })
  name: string;

  @Field((_) => String)
  @Column({ length: 7 })
  shortName: string;
}
