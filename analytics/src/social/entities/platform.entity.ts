import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum SocialPlatformType {
  TWITTER = 'twitter',
}

@Entity()
export class SocialPlatform {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: SocialPlatformType })
  type: SocialPlatformType;

  @Column()
  logo: string;
}
