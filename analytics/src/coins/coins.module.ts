import { Module } from '@nestjs/common';
import { CoinsService } from './services/coins.service';
import { CoinsController } from './coins.controller';
import { CoinmarketcapGatewayService } from './services/coinmarketcap.service';
import { CoinAggregationService } from './services/aggregation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coin } from './entities/coin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coin])],
  controllers: [CoinsController],
  providers: [
    CoinsService,
    CoinmarketcapGatewayService,
    CoinAggregationService,
  ],
  exports: [CoinsService],
})
export class CoinsModule {}
