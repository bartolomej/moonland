import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum SocialPlatformType {
  TWITTER = 'twitter',
}

// TODO: add as relation to user or post when support for multiple platforms is added

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
