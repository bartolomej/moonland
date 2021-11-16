import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Coin {
  @PrimaryColumn()
  id: string; // symbol

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column()
  logo: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  websiteUrl: string;

  @Column()
  explorerUrl: string;

  @Column()
  cmcId: string;

  // TODO: add financial data as rank, price, market cap, volume, number of pairs,...

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
