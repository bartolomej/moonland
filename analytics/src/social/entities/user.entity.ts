import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { SocialPost } from './post.entity';

@Entity()
export class SocialUser {
  @PrimaryColumn()
  id: string;

  @Column()
  socialId: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  connectionsCount: number;

  @OneToMany(() => SocialPost, (mention) => mention.user)
  posts: SocialPost[];
}
