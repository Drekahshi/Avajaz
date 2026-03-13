import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Domain } from './domain';
import { User } from './user';

@Entity('avajaz_chess_stake')
export class AvajazChessStake extends Domain {

  @Column({ name: 'bet_id', unique: true })
  betId!: number;

  @Column({ name: 'amount', type: 'decimal', precision: 18, scale: 6 })
  amount!: number;

  @Column({ name: 'tx_hash'})
  txHash!: string;

  @ManyToOne(() => User, (user) => user.avajazChessStakes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

}