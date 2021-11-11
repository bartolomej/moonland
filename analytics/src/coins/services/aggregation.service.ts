import { Injectable } from '@nestjs/common';
import { CoinmarketcapGatewayService } from './coinmarketcap.service';
import { plainToClass } from 'class-transformer';
import { Coin } from '../entities/coin.entity';
import { CoinsService } from './coins.service';

@Injectable()
export class CoinAggregationService {
  constructor(
    private readonly cmcService: CoinmarketcapGatewayService,
    private readonly coinService: CoinsService,
  ) {}

  // TODO: remove limit later on
  async refetchCoinData(limit = 10) {
    let cmcCoins = await this.cmcService.fetchBasicInfo();
    if (limit) {
      cmcCoins = cmcCoins.splice(0, limit);
    }
    const cmcMetadataMap = await this.cmcService.fetchInfoInBatch(
      cmcCoins.map((coin) => coin.id),
    );
    const coins = cmcCoins.map((coin) => {
      const metadata = cmcMetadataMap[coin.id];
      return plainToClass(Coin, {
        id: coin.symbol,
        name: coin.name,
        symbol: coin.symbol,
        logo: metadata.logo,
        description: metadata.description,
        websiteUrl: metadata.urls.website[0],
        explorerUrl: metadata.urls.explorer[0],
        cmcId: coin.id,
      });
    });
    return await Promise.all(
      coins.map((coin) => this.coinService.update(coin)),
    );
  }
}
