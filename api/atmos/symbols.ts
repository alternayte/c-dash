import { gql } from '@apollo/client';

export const SYMBOLS = gql`
  query GetSymbols($exchange: SymbolExchangeType!) {
    symbols(
      take: 20
      exchange: $exchange
      where: { status: { equals: "TRADING" }, symbol: { endsWith: "USDT" } }
    ) {
      id
      symbol
      baseAsset
      quoteAsset
      status
    }
  }
`;
