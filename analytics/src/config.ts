import IClientOptions from 'twitter-api-client/dist/base/IClientOptions';

const {
  COINMARKETCAP_API_KEY,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
} = process.env;

export const coinMarketCap = {
  apiKey: COINMARKETCAP_API_KEY,
};

export const twitter: IClientOptions = {
  apiKey: TWITTER_API_KEY,
  apiSecret: TWITTER_API_SECRET,
  accessToken: TWITTER_ACCESS_TOKEN,
  accessTokenSecret: TWITTER_ACCESS_TOKEN_SECRET,
};
