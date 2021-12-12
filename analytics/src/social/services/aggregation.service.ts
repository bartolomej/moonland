import { Injectable, Logger } from '@nestjs/common';
import { TwitterGatewayService } from './twitter.service';
import { CoinsService } from '../../coins/services/coins.service';
import { plainToClass } from 'class-transformer';
import { SocialPost } from '../entities/post.entity';
import { SocialPostService } from './post.service';
import { SocialUserService } from './user.service';
import { SocialUser } from '../entities/user.entity';
import { User as TwitterUser } from 'twitter-api-client/dist/interfaces/types/SearchTypes';
import {
  UsersLookup as TwitterUserLookup,
  Search as TwitterSearch,
} from 'twitter-api-client';
import { Coin } from '../../coins/entities/coin.entity';

@Injectable()
export class SocialAggregationService {
  private readonly logger = new Logger(SocialAggregationService.name);

  constructor(
    private readonly twitterGateway: TwitterGatewayService,
    private readonly coinsService: CoinsService,
    private readonly socialPostService: SocialPostService,
    private readonly socialUserService: SocialUserService,
  ) {}

  async fetch() {
    const coins = await this.coinsService.findAll(1);

    this.logger.debug(`Aggregating mentions for ${coins.length} coins`);

    // remap data to target form
    const tweetsByCoins = await this.fetchTweetsByCoins(coins);
    const users = await this.fetchUsersByTweets(tweetsByCoins);
    const posts = this.serializeTweets(tweetsByCoins, coins);

    this.logger.debug(`Aggregated ${posts.length} mentions`);

    // store results
    await this.storeMultiple(
      (user) => this.socialUserService.save(user),
      users,
    );
    await this.storeMultiple(
      (post) => this.socialPostService.save(post),
      posts,
    );
  }

  private async fetchTweetsByCoins(coins: Coin[]) {
    return Promise.all(coins.map((coin) => this.twitterGateway.findAll(coin)));
  }

  private async fetchUsersByTweets(tweets: TwitterSearch[]) {
    const groups = tweets.map((group) =>
      group.statuses.map(async (tweet) => [
        SocialAggregationService.serializeTwitterUser(tweet.user),
        ...(await this.fetchUsers(
          tweet.entities.user_mentions.map((u) => u.id_str),
        )),
      ]),
    );
    return (await Promise.all(groups.flat().flat())).flat();
  }

  private async fetchUsers(userIds: any[]) {
    const users = await this.twitterGateway.findUsers(userIds);
    return users.map((user) =>
      SocialAggregationService.serializeTwitterUser(user),
    );
  }

  private serializeTweets(tweets: TwitterSearch[], coins: Coin[]) {
    return tweets
      .map((group, mentionIndex) =>
        group.statuses.map((mention) => {
          return plainToClass(SocialPost, {
            id: mention.id_str,
            text: mention.text,
            createdAt: new Date(mention.created_at),
            user: mention.user.id,
            userMentions: mention.entities.user_mentions.map(
              (user) => user.id_str,
            ),
            coin: coins[mentionIndex],
          });
        }),
      )
      .flat();
  }

  private static serializeTwitterUser(user: TwitterUser | TwitterUserLookup) {
    return plainToClass(SocialUser, {
      id: user.id_str,
      name: user.name,
      username: user.screen_name,
      followersCount: user.followers_count,
      description: user.description,
    });
  }

  private storeMultiple<T>(
    savePromise: (e: T) => Promise<T | void>,
    entities: T[],
  ) {
    return Promise.all(
      entities.map((e) =>
        savePromise(e).catch((e) => {
          // ignore errors for now
          this.logger.debug(`Save error: ${e.message}`);
        }),
      ),
    );
  }
}
