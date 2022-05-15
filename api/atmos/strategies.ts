import { gql } from '@apollo/client';

export const STRATEGIES = gql`
  query GetStrategies($exchange: ExchangeType!, $symbol: String!) {
    strategies(exchange: $exchange, symbol: $symbol) {
      id
    }
  }
`;
