import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoles {
  admin = 'admin',
  businessAdmin = 'businessAdmin',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email: string;

  @Column({ type: 'simple-enum', enum: UserRoles, nullable: true })
  public role?: UserRoles;

  @Column()
  public password: string;

  @Column()
  public salt: string;
}
