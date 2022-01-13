import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SocialPost } from '../../social/entities/post.entity';

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

  @Column({ nullable: true })
  websiteUrl: string;

  @Column({ nullable: true })
  explorerUrl: string;

  @Column()
  cmcId: string;

  @Column()
  cmcRank: number;

  // TODO: add financial data as rank, price, market cap, volume, number of pairs,...

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => SocialPost, (post) => post.coin)
  mentions: SocialPost[];
}
