import { Injectable } from '@nestjs/common';
import { TwitterClient } from 'twitter-api-client';
import { twitter } from '../../config';
import { Coin } from '../../coins/entities/coin.entity';
import { SocialPostService } from './post.service';

@Injectable()
export class TwitterGatewayService {
  private client: TwitterClient;

  constructor(private readonly postService: SocialPostService) {
    this.client = new TwitterClient(twitter);
  }

  async findAll(coin: Coin, limit = 100) {
    const [lastMention] = await this.postService.findAll(coin.id, 1);
    return this.client.tweets.search({
      q: `#${coin.symbol}`, // search by hashtag
      count: limit,
      since_id: lastMention?.id,
    });
  }
}
