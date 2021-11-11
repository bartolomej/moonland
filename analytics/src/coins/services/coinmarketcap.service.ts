import { Injectable } from '@nestjs/common';
import { coinMarketCap } from '../../config';
import axios from 'axios';

type CoinmarketcapResStatus = {
  timestamp: string;
  error_code: string;
  error_message: string;
  elapsed: number;
  credit_count: number;
  notice: null | any;
};

type CoinmarketcapRes<T> = {
  status: CoinmarketcapResStatus;
  data: T;
};

type CoinCategory = 'all' | 'spot' | 'derivatives' | 'otc' | 'perpetual';

type CoinPlatformInfo = null | {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
};

type CoinCommonInfo = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
};

type CoinInfo = CoinCommonInfo & {
  rank: number;
  is_active: number;
  first_historical_data: string;
  last_historical_data: string;
  platform: CoinPlatformInfo;
};

type CoinMetadata = CoinCommonInfo & {
  logo: string;
  description: string;
  date_added: string;
  tags: string[];
  'tag-names': string[];
  'tag-groups': string[];
  platform: CoinPlatformInfo;
  category: CoinCategory;
  date_launched: string | null;
  urls: {
    website: string[];
    technical_doc: string[];
    twitter: string[];
    reddit: string[];
    message_board: string[];
    announcement: string[];
    chat: string[];
    explorer: string[];
    source_code: string[];
  };
};

type CoinPairData = {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  last_updated: string;
};

type CoinListingData = CoinCommonInfo & {
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: CoinPlatformInfo;
  quote: { [symbol: string]: CoinPairData };
};

@Injectable()
export class CoinmarketcapGatewayService {
  private readonly apiKey: string;
  constructor() {
    this.apiKey = coinMarketCap.apiKey;
  }

  private fetch<T>(endpoint: string, params?: any) {
    const url = 'https://pro-api.coinmarketcap.com' + endpoint;
    return axios.get<T>(url, {
      headers: {
        'X-CMC_PRO_API_KEY': this.apiKey,
      },
      params,
    });
  }

  async fetchCryptocurrencyMap() {
    const { data } = await this.fetch<CoinmarketcapRes<CoinInfo[]>>(
      '/v1/cryptocurrency/map',
    );
    return data;
  }

  async fetchCryptocurrencyInfo(coinIds: number[]) {
    return this.fetch<CoinmarketcapRes<{ [slug: string]: CoinMetadata }>>(
      '/v1/cryptocurrency/info',
      { id: coinIds.join(',') },
    );
  }

  async fetchCryptocurrencyLatestListing() {
    return this.fetch<CoinmarketcapRes<CoinListingData[]>>(
      '/v1/cryptocurrency/listing/latest',
    );
  }
}
