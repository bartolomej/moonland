import IClientOptions from 'twitter-api-client/dist/base/IClientOptions';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const {
  COINMARKETCAP_API_KEY,

  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,

  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,

  COIN_FETCH_INTERVAL,
  SOCIAL_FETCH_INTERVAL,
} = process.env;

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
export const coinFetchInterval = +COIN_FETCH_INTERVAL || hour;
export const socialFetchInterval = +SOCIAL_FETCH_INTERVAL || 10 * minute;

export const coinMarketCap = {
  apiKey: COINMARKETCAP_API_KEY,
};

export const twitter: IClientOptions = {
  apiKey: TWITTER_API_KEY,
  apiSecret: TWITTER_API_SECRET,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessTokenSecret: TWITTER_ACCESS_TOKEN_SECRET,
};

export const typeorm: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  password: DB_PASSWORD,
  username: DB_USER,
  database: DB_DATABASE,
  entities: [],
  synchronize: true, // disable in stable production environment
  autoLoadEntities: true,
  charset: 'utf8mb4', // use 4 bytes per character encoding (to support emojis)
};
