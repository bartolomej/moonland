import { Module } from '@nestjs/common';
import { MentionService } from './services/mention.service';
import { SocialController } from './controllers/social.controller';
import { TwitterGatewayService } from './services/twitter.service';
import { MentionController } from './controllers/mention.controller';
import { SocialAggregationService } from './services/aggregation.service';
import { CoinsModule } from '../coins/coins.module';

@Module({
  controllers: [SocialController, MentionController],
  providers: [MentionService, TwitterGatewayService, SocialAggregationService],
  imports: [CoinsModule],
})
export class SocialModule {}
