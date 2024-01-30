import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { RefreshToken } from './refreshToken.model';
import { UserType } from './userType.model';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100 })
  email!: string;

  @Column({ length: 100 })
  password!: string;

  @OneToOne(() => RefreshToken, (refreshToken) => refreshToken.uuid)
  refreshToken: RefreshToken;

  @ManyToOne(() => UserType, (userType) => userType.type)
  type!: UserType[];
}
