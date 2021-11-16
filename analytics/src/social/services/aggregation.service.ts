import { Injectable, Logger } from '@nestjs/common';
import { TwitterGatewayService } from './twitter.service';
import { CoinsService } from '../../coins/services/coins.service';
import { plainToClass } from 'class-transformer';
import { SocialPost } from '../entities/post.entity';
import { SocialPostService } from './post.service';
import { SocialUserService } from './user.service';
import { SocialUser } from '../entities/user.entity';
import { AppException, AppExceptionType } from '../../errors';

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
    const coins = await this.coinsService.findAll();
    this.logger.debug(`Aggregating mentions for ${coins.length} coins`);
    const twitterMentions = await Promise.all(
      coins.map((coin) => this.twitterGateway.findAllByQuery(coin.symbol)),
    );
    const users = twitterMentions
      .map((group) =>
        group.statuses.map((mention) => [
          plainToClass(SocialUser, {
            id: mention.user.id,
            name: mention.user.name,
            username: mention.user.screen_name,
          }),
          ...mention.entities.user_mentions.map((user) =>
            plainToClass(SocialUser, {
              id: user.id,
              name: user.name,
              username: user.screen_name,
            }),
          ),
        ]),
      )
      .flat()
      .flat();
    const mentions = twitterMentions
      .map((group) =>
        group.statuses.map((mention) => {
          return plainToClass(SocialPost, {
            id: mention.id,
            text: mention.text,
            timestamp: new Date(mention.created_at).getTime(),
            user: mention.user.id,
            userMentions: mention.entities.user_mentions.map((user) => user.id),
          });
        }),
      )
      .flat();
    await Promise.all(
      users.map((user) =>
        this.socialUserService.save(user).catch((e: AppException) => {
          // ignore duplicate entries
          if (!e.isType(AppExceptionType.DUPLICATE_ENTRY)) {
            throw e;
          }
        }),
      ),
    );
    return Promise.all(
      mentions.map((posts) => this.socialPostService.save(posts)),
    );
  }
}
