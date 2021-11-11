import { Module } from '@nestjs/common';
import { CoinsService } from './services/coins.service';
import { CoinsController } from './coins.controller';
import { CoinmarketcapGatewayService } from './services/coinmarketcap.service';
import { CoinAggregationService } from './services/aggregation.service';

@Module({
  controllers: [CoinsController],
  providers: [
    CoinsService,
    CoinmarketcapGatewayService,
    CoinAggregationService,
  ],
  exports: [CoinsService],
})
export class CoinsModule {}
