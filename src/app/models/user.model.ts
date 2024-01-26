import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
} from 'typeorm';
import { RefreshToken } from './refreshToken.model';

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
}
