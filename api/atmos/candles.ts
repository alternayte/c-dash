import { gql } from '@apollo/client';

export const CANDLES = gql`
  query GetCandles($exchange: ExchangeType!, $symbol: String!, $take: Float) {
    candles(exchange: $exchange, symbol: $symbol, take: $take, order_by: "ASC") {
      open
      high
      low
      close
      time
      baseVolume
      quoteVolume
    }
  }
`;

export const CANDLES_SUBSCRIPTION = gql`
  subscription OnCandleReceived($exchange: ExchangeType!, $symbol: String!) {
    ohlcv(exchange: $exchange, symbol: $symbol) {
      __typename
      open
      high
      low
      close
      time
      baseVolume
      quoteVolume
    }
  }
`;

export const LATEST_CANDLE = gql`
  query GetCandles($exchange: ExchangeType!, $symbol: String!) {
    candles(exchange: $exchange, symbol: $symbol, take: 1, order_by: "DESC") {
      open
      high
      low
      close
      time
      baseVolume
      quoteVolume
    }
  }
`;
