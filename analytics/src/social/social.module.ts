import { Module } from '@nestjs/common';
import { SocialPostService } from './services/post.service';
import { SocialController } from './controllers/social.controller';
import { TwitterGatewayService } from './services/twitter.service';
import { SocialPostController } from './controllers/post.controller';
import { SocialAggregationService } from './services/aggregation.service';
import { CoinsModule } from '../coins/coins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialPlatform } from './entities/platform.entity';
import { SocialPost } from './entities/post.entity';
import { SocialUser } from './entities/user.entity';
import { SocialUserService } from './services/user.service';
import { SocialUserController } from './controllers/user.controller';
import { StatsController } from './controllers/stats.controller';

@Module({
  imports: [
    CoinsModule,
    TypeOrmModule.forFeature([SocialPlatform, SocialPost, SocialUser]),
  ],
  controllers: [
    SocialController,
    SocialPostController,
    SocialUserController,
    StatsController,
  ],
  providers: [
    SocialPostService,
    TwitterGatewayService,
    SocialAggregationService,
    SocialUserService,
  ],
  exports: [SocialPostService, SocialUserService],
})
export class SocialModule {}
