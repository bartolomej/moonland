import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { SocialController } from './controllers/social.controller';
import { TwitterGatewayService } from './services/twitter.service';
import { PostController } from './controllers/post.controller';
import { SocialAggregationService } from './services/aggregation.service';
import { CoinsModule } from '../coins/coins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialPlatform } from './entities/platform.entity';
import { SocialPost } from './entities/post.entity';
import { SocialUser } from './entities/user.entity';

@Module({
  imports: [
    CoinsModule,
    TypeOrmModule.forFeature([SocialPlatform, SocialPost, SocialUser]),
  ],
  controllers: [SocialController, PostController],
  providers: [PostService, TwitterGatewayService, SocialAggregationService],
})
export class SocialModule {}
