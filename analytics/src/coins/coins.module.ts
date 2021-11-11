import { Module } from '@nestjs/common';
import { CoinsService } from './services/coins.service';
import { CoinsController } from './coins.controller';
import { CoinmarketcapGatewayService } from './services/coinmarketcap.service';

@Module({
  controllers: [CoinsController],
  providers: [CoinsService, CoinmarketcapGatewayService],
})
export class CoinsModule {}
