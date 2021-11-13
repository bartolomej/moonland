export enum SocialPlatformType {
  TWITTER = 'twitter',
}

export class SocialPlatform {
  id: string;
  name: string;
  type: SocialPlatformType;
  logo: string;
}
