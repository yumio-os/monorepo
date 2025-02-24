import { BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'int', nullable: true })
  public salt: number;

  @BeforeInsert()
  checkSelt() {
    if (!this.salt) {
      this.salt = Math.floor(Math.random() * 1000000);
    }
  }
}
