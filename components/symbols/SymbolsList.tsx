import { SYMBOLS } from '@/api/atmos/symbols';
import { SymbolResults } from '@/interfaces/atmos';
import { useQuery } from '@apollo/client';
import React from 'react';
import SymbolsListItem from './SymbolsListItem';

type Props = {};

const SymbolsList = (props: Props) => {
  const { loading, error, data } = useQuery<SymbolResults>(SYMBOLS, {
    variables: { exchange: 'Binance' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.symbols.slice(0, 5).map((symbol) => (
        <SymbolsListItem symbol={symbol} key={symbol.symbol} />
      ))}
    </div>
  );
};

export default SymbolsList;
