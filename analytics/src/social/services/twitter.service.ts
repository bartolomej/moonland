import { Injectable, Logger } from '@nestjs/common';
import { TwitterClient } from 'twitter-api-client';
import { twitter } from '../../config';
import { Coin } from '../../coins/entities/coin.entity';
import { SocialPostService } from './post.service';

@Injectable()
export class TwitterGatewayService {
  private readonly logger = new Logger(TwitterGatewayService.name);
  private client: TwitterClient;

  constructor(private readonly postService: SocialPostService) {
    this.client = new TwitterClient(twitter);
  }

  async findAll(coin: Coin, limit = 100) {
    const [lastMention] = await this.postService.findAll({
      coin: coin.id,
      limit: 1,
    });
    return this.client.tweets.search({
      q: `#${coin.symbol}`, // search by hashtag
      count: limit,
      since_id: lastMention?.id,
    });
  }

  async findUsers(userIds: string[]) {
    // TODO: fetch users in batches of 100
    return this.client.accountsAndUsers
      .usersLookup({
        user_id: userIds.join(','),
      })
      .catch((e) => {
        this.logger.error(`Failed to fetch user ${userIds}: `, e);
        return userIds.map((id_str) => ({ id_str }));
      });
  }
}
