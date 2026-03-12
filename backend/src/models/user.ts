import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Domain } from './domain';
import { Token } from './auth_token';
import { PolymarketStake } from './poly_market';
import { AvajazChessStake } from './chess_staking';
@Entity('_user')
export class User extends Domain {

  @Column({ type: 'varchar', length: 256, unique: true, name: 'wallet_address', nullable: true })
  walletAddress!: string;
  
  @Column({ type: 'varchar', length: 256, unique: true, nullable: true, name: 'email' })
  email?: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'name' })
  name?: string;

  @Column({ default: false, name: 'is_active' })
  isActive!: boolean;

  @Column({ name: 'password',  nullable: true })
  password?: string;

  @OneToMany(() => Token, (token) => token.user)
  tokens!: Token[];

  @OneToMany(() => PolymarketStake, (stake) => stake.user)
  polymarketStakes!: PolymarketStake[];

  @OneToMany(() => AvajazChessStake, (stake) => stake.user)
  avajazChessStakes!: AvajazChessStake[];

}