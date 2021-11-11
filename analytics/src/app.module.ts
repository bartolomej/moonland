import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';

@Module({
  imports: [CoinsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
