import { ExchangeType } from '.';

export type ConfigResults = {
  configs: Config[];
};

export type Config = {
  id: string;
  symbol: string;
  enabled: boolean;
  exchange: ExchangeType;
  quoteAmount: number;
};
