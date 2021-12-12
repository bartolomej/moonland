import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { SocialPost } from './post.entity';

@Entity()
export class SocialUser {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  followersCount: number;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => SocialPost, (mention) => mention.user)
  posts: SocialPost[];
}
