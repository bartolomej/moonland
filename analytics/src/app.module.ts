import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import { SocialModule } from './social/social.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeorm } from './config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CoinsModule,
    SocialModule,
    TypeOrmModule.forRoot(typeorm),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
