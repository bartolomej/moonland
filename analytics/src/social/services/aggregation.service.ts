import { Injectable, Logger } from '@nestjs/common';
import { TwitterGatewayService } from './twitter.service';
import { CoinsService } from '../../coins/services/coins.service';
import { plainToClass } from 'class-transformer';
import { SocialPost } from '../entities/post.entity';
import { PostService } from './post.service';

@Injectable()
export class SocialAggregationService {
  private readonly logger = new Logger(SocialAggregationService.name);

  constructor(
    private readonly twitterGateway: TwitterGatewayService,
    private readonly coinsService: CoinsService,
    private readonly socialPostService: PostService,
  ) {}

  async fetch() {
    const coins = await this.coinsService.findAll();
    this.logger.debug(`Aggregating mentions for ${coins.length} coins`);
    const twitterMentions = await Promise.all(
      coins.map((coin) => this.twitterGateway.findAllByQuery(coin.symbol)),
    );
    const mentions = twitterMentions.map((group) =>
      group.statuses.map((mention) => {
        return plainToClass(SocialPost, {
          id: mention.id,
          socialId: mention.id,
          text: mention.text,
          timestamp: new Date(mention.created_at).getTime(),
          user: mention.id,
          userMentions: mention.entities.user_mentions.map((user) => user.id),
        });
      }),
    );
    return Promise.all(
      mentions.map((group) =>
        group.map((mention) => this.socialPostService.save(mention)),
      ),
    );
  }
}
