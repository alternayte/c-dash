export type SymbolPair = {
  id: string;
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  status: string;
};

export type SymbolResults = {
  symbols: SymbolPair[];
};

export type CandleOHLCV = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  baseVolume: number;
  quoteVolume: number;
};

export type CandleResults = {
  candles: CandleOHLCV[];
};

export type CandleSubscriptionResult = {
  ohlcv: CandleOHLCV;
};
