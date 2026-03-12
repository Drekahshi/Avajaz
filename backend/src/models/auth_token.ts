import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Domain } from './domain';
import { User } from './user';

@Entity('auth_token')
export class Token extends Domain {

  @Column({ type: 'varchar', length: 1024, unique: true, name: 'token' })
  token!: string;

  @Column({ default: false, name: 'expired' })
  expired!: boolean;

  @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ type: 'timestamp', name: 'expires_at' })
  expiresAt?: Date;
}