import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { SocialPost } from './post.entity';

@Entity()
export class SocialUser {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  name: string;

  // TODO: add additional fields like description, connectionsCount,..

  @OneToMany(() => SocialPost, (mention) => mention.user)
  posts: SocialPost[];
}
