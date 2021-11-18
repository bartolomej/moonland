import { SocialUser } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

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
}
