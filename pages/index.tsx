import { LATEST_CANDLE } from '@/api/atmos/candles';
import SimpleSidebarLayout from '@/components/layouts/SimpleSidebarLayout';
import SymbolInfoGrid from '@/components/symbols/SymbolInfoGrid';
import SymbolSearchInput from '@/components/symbols/SymbolSearchInput';
import SymbolsList from '@/components/symbols/SymbolsList';
import { CandleOHLCV } from '@/interfaces/atmos';
import { useLazyQuery } from '@apollo/client';
import { Button, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const IndexPage = () => {
  const [selectedPair, setSelectedPair] = useState('');
  const [search, setSearch] = useState<string>('');
  const [candles, setCandles] = useState<CandleOHLCV[]>([]);
  const [getCandle, { loading, error, data }] = useLazyQuery(LATEST_CANDLE);

  useEffect(() => {
    if (data) {
      setCandles((prev) => [...prev, ...data.candles]);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <SimpleSidebarLayout title='Home | Next.js + TypeScript Example'>
      <HStack maxWidth={{ base: 'xl' }}>
        <SymbolSearchInput search={search} handleChange={handleChange} />
        <Button
          onClick={() =>
            getCandle({ variables: { exchange: 'Binance', symbol: search.toUpperCase() } })
          }
        >
          Search
        </Button>
      </HStack>
      <SymbolInfoGrid symbolInfos={candles} />
    </SimpleSidebarLayout>
  );
};

export default IndexPage;
