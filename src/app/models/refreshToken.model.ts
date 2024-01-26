import {
  Entity,
  Column,
  BaseEntity,
  Generated,
  OneToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.model';
@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryColumn()
  @Generated('uuid')
  uuid!: number;

  @Column()
  expiresIn!: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user!: User;
}
