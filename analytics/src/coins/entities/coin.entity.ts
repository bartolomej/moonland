export class Coin {
  id: string; // symbol
  name: string;
  symbol: string;
  logo: string;
  description: string;
  websiteUrl: string;
  explorerUrl: string;
  cmcId: string;

  // TODO: add financial data as rank, price, market cap, volume, number of pairs,...

  updatedAt: Date;
  createdAt: Date;
}
