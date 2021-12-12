import { Injectable, Logger } from '@nestjs/common';
import { coinMarketCap } from '../../config';
import axios from 'axios';

type CmcResStatus = {
  timestamp: string;
  error_code: string;
  error_message: string;
  elapsed: number;
  credit_count: number;
  notice: null | any;
};

type CmcRes<T> = {
  status: CmcResStatus;
  data: T;
};

type CmcCoinCategory = 'all' | 'spot' | 'derivatives' | 'otc' | 'perpetual';

type CmcCoinPlatformInfo = null | {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
};

type CmcCoinCommonInfo = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
};

export type CmcCoinInfo = CmcCoinCommonInfo & {
  rank: number;
  is_active: number;
  first_historical_data: string;
  last_historical_data: string;
  platform: CmcCoinPlatformInfo;
};

export type CmcCoinMetadata = CmcCoinCommonInfo & {
  logo: string;
  description: string;
  date_added: string;
  tags: string[];
  'tag-names': string[];
  'tag-groups': string[];
  platform: CmcCoinPlatformInfo;
  category: CmcCoinCategory;
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

export type CmcCoinPairData = {
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

export type CmcCoinListingData = CmcCoinCommonInfo & {
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  last_updated: string;
  date_added: string;
  tags: string[];
  platform: CmcCoinPlatformInfo;
  quote: { [symbol: string]: CmcCoinPairData };
};

export type CmcMetadataMap = { [slug: string]: CmcCoinMetadata };
type CmcMetadataResponse = CmcRes<CmcMetadataMap>;
type CmcLatestListingResponse = CmcRes<CmcCoinListingData[]>;
type CmcInfoResponse = CmcRes<CmcCoinInfo[]>;

@Injectable()
export class CoinmarketcapGatewayService {
  private readonly logger = new Logger(CoinmarketcapGatewayService.name);
  private readonly apiKey: string;

  constructor() {
    this.apiKey = coinMarketCap.apiKey;
  }

  private fetch<T>(endpoint: string, params?: any) {
    const url = 'https://pro-api.coinmarketcap.com' + endpoint;
    this.logger.debug(`fetching: ${url}`);
    return axios
      .get<T>(url, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
        },
        params,
      })
      .catch((e) => {
        this.logger.error(`fetch error: ${e.message}`, e.stack);
        throw e;
      });
  }

  async fetchBasicInfo() {
    const { data: axiosData } = await this.fetch<CmcInfoResponse>(
      '/v1/cryptocurrency/map',
    );
    return axiosData.data;
  }

  async fetchInfoInBatch(coinIds: number[]) {
    const requests = [];
    while (coinIds.length > 0) {
      requests.push(this.fetchInfo(coinIds.splice(0, 1000)));
    }
    const responses = await Promise.all<CmcMetadataMap>(requests);
    return responses.reduce<CmcMetadataMap>(
      (prev, curr) => ({ ...prev, ...curr }),
      {},
    );
  }

  async fetchInfo(coinIds: number[]) {
    const { data: axiosData } = await this.fetch<CmcMetadataResponse>(
      '/v1/cryptocurrency/info',
      { id: coinIds.join(',') },
    );
    return axiosData.data;
  }

  async fetchLatestListing() {
    const { data: axiosData } = await this.fetch<CmcLatestListingResponse>(
      '/v1/cryptocurrency/listing/latest',
    );
    return axiosData.data;
  }
}
