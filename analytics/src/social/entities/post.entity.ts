import { SocialUser } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Coin } from '../../coins/entities/coin.entity';

@Entity()
export class SocialPost {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @ManyToOne(() => SocialUser, (user) => user.posts)
  user: SocialUser;

  @ManyToOne(() => Coin, (coin) => coin.mentions)
  coin: Coin;
}
