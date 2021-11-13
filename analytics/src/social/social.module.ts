import { Module } from '@nestjs/common';
import { SocialService } from './services/social.service';
import { SocialController } from './social.controller';
import { TwitterGatewayService } from './services/twitter.service';

@Module({
  controllers: [SocialController],
  providers: [SocialService, TwitterGatewayService],
})
export class SocialModule {}
