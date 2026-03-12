import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Domain } from './domain';
import { User } from './user';

@Entity('polymarket_stake')
export class PolymarketStake extends Domain {

  @Column({ name: 'token_id' })
  tokenId!: number;

  @Column({ name: 'bet_id', unique: true })
  betId!: number;

  @Column({ name: 'amount', type: 'decimal', precision: 18, scale: 6 })
  amount!: number;

  @Column({ name: 'odds', type: 'decimal', precision: 10, scale: 4 })
  odds!: number;

  @Column({ default: false, name: 'is_active' })
  isActive!: boolean;

  @Column({ name: 'payout', type: 'decimal', precision: 18, scale: 6, nullable: true })
  payout!: number | null;

  @Column({ name: 'tx_hash', nullable: true })
  txHash!: string | null;

  @ManyToOne(() => User, (user) => user.polymarketStakes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}