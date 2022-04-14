import { CANDLES, CANDLES_SUBSCRIPTION } from '@/api/atmos/candles';
import CandleChart from '@/components/charts/CandleChart';
import { CandleOHLCV, CandleResults, CandleSubscriptionResult } from '@/interfaces/atmos';
import { useQuery } from '@apollo/client';
import { Skeleton } from '@chakra-ui/react';
import { timeStamp } from 'console';
import { KLineData } from 'klinecharts';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

type Props = {};

const SymbolDetail = (props: Props) => {
  const [klines, setKlines] = React.useState<KLineData[]>([]);
  const router = useRouter();
  const { symbol } = router.query;
  const parsedSymbol = (symbol as string)?.toUpperCase();

  const { loading, error, data, subscribeToMore } = useQuery<CandleResults>(CANDLES, {
    variables: { exchange: 'Binance', symbol: parsedSymbol, take: 1000 },
  });

  useEffect(() => {
    if (data?.candles) {
      const klineData = data.candles.map(({ open, high, low, close, time, baseVolume }) => {
        return {
          timestamp: new Date(time).getTime(),
          open: Number(open),
          high: Number(high),
          low: Number(low),
          close: Number(close),
          volume: Number(baseVolume),
        };
      });
      console.log('use effect klines');
      setKlines(klineData);
      console.log('use effect klines', klineData);
    }

    // return () => {
    //   second
    // }
  }, [data]);

  useEffect(() => {
    console.log('klines updated');
  }, [klines]);

  const memoizedSubscribeToMore = React.useCallback(() => {
    subscribeToMore<CandleSubscriptionResult>({
      document: CANDLES_SUBSCRIPTION,
      variables: { exchange: 'Binance', symbol: 'ETHUSDT' },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        console.log('updateQuery triggered');
        console.log(subscriptionData);
        const {
          ohlcv: { open, high, low, close, time, baseVolume, quoteVolume },
        } = subscriptionData.data;
        const newCandle: CandleOHLCV = {
          time,
          open,
          high,
          low,
          close,
          baseVolume,
          quoteVolume,
        };
        //const newCandle = subscriptionData.data.candles[0];
        console.log('prev result');
        console.log(prev);
        // check prev.candles is an array

        console.log(Object.keys(prev.candles).length);
        if (!prev.candles) return prev;
        const newCandles = [...prev.candles, newCandle];
        console.log('new candle added');

        const newKline = {
          timestamp: new Date(time).getTime(),
          open: Number(open),
          high: Number(high),
          low: Number(low),
          close: Number(close),
          volume: Number(baseVolume),
        };
        setKlines((prevKlines) => [...prevKlines, newKline]);

        return {
          candles: newCandles,
        };
      },
    });
  }, [subscribeToMore]);

  if (loading) return <Skeleton />;
  if (error) {
    console.error(error);
    return <p>Error :(</p>;
  }
  // if (data.candles) {
  //   //const { candles } = data;
  //   console.log(data.candles);
  // }

  return (
    <>
      <div>SymbolDetail: {parsedSymbol}</div>
      <Skeleton isLoaded={!loading && klines.length > 0}>
        <CandleChart subscribeToMoreCandles={memoizedSubscribeToMore} data={klines} />
      </Skeleton>
    </>
  );
};

export default SymbolDetail;
