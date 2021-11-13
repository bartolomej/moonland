import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import { SocialModule } from './social/social.module';

@Module({
  imports: [CoinsModule, SocialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
