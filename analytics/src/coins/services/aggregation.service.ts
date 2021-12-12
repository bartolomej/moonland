import { Injectable, Logger } from '@nestjs/common';
import {
  CmcCoinInfo,
  CmcMetadataMap,
  CoinmarketcapGatewayService,
} from './coinmarketcap.service';
import { plainToClass } from 'class-transformer';
import { Coin } from '../entities/coin.entity';
import { CoinsService } from './coins.service';

@Injectable()
export class CoinAggregationService {
  private readonly logger = new Logger(CoinAggregationService.name);

  constructor(
    private readonly cmcService: CoinmarketcapGatewayService,
    private readonly coinService: CoinsService,
  ) {}

  // TODO: remove limit later on
  async fetch(limit?: number) {
    let cmcCoins = await this.cmcService.fetchBasicInfo();
    if (limit) {
      cmcCoins = cmcCoins.splice(0, limit);
    }
    this.logger.debug(`Aggregating data for ${cmcCoins.length} coins`);
    const cmcMetadataMap = await this.cmcService.fetchInfoInBatch(
      cmcCoins.map((coin) => coin.id),
    );
    return await Promise.all(
      this.serializeCoins(cmcCoins, cmcMetadataMap).map((coin) =>
        this.coinService.upsert(coin),
      ),
    );
  }

  private serializeCoins(coins: CmcCoinInfo[], cmcCoinMeta: CmcMetadataMap) {
    return coins.map((coin) => {
      const metadata = cmcCoinMeta[coin.id];
      return plainToClass(Coin, {
        id: coin.symbol,
        name: coin.name,
        symbol: coin.symbol,
        logo: metadata.logo,
        description: metadata.description,
        websiteUrl: metadata.urls.website[0],
        explorerUrl: metadata.urls.explorer[0],
        cmcId: coin.id,
        cmcRank: coin.rank,
      });
    });
  }
}
