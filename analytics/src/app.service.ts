import { Injectable } from '@nestjs/common';
import { CoinsService } from './coins/services/coins.service';
import { SocialPostService } from './social/services/post.service';
import { SocialUserService } from './social/services/user.service';

@Injectable()
export class AppService {
  constructor(
    private readonly coinsService: CoinsService,
    private readonly postService: SocialPostService,
    private readonly userService: SocialUserService,
  ) {}

  async getStats() {
    const [coin, post, user] = await Promise.all([
      this.coinsService.getStats(),
      this.postService.getStats(),
      this.userService.getStats(),
    ]);
    return { coin, post, user };
  }
}
