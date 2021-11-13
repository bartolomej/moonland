import { SocialUser } from './user.entity';

export class SocialMention {
  id: string;
  socialId: string;
  timestamp: number;
  text: string;
  user: SocialUser;
  userMentions: SocialUser[];
}
